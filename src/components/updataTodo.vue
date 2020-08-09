<template>
  <section class="px-64">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="title"
          >Название</label>
          <input
            v-model="title"
            placeholder="Task"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="title"
            type="text"
            value="this.vm.todos[this.index].title"
          />
          <p class="text-red text-xs italic">Please fill out this field.</p>
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="completion-date"
          >Дата выполнения задачи</label>
          <div class="flex justify-between">
          <vueye-datepicker v-if="visibleDate" v-model="date" placeholder="Date" color="#4466ee" format="dd-mm-yyyy" class="py-3 px-4"/>          
            <button @click="removeDateClick()" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow">
            {{nameOfDateButton}}
          </button>
          </div>
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="description"
          >Описание</label>
          <input
            v-model="description"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="description"
            type="text"
            placeholder="Description"
        
          />
          <!-- <p class="text-grey-dark text-xs italic">Make it as long and as crazy as you'd like</p> -->
        </div>
      </div>

      <div class="md:w-1/2 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"          
        >Подзадачи</label>
        <div class="flex flex-col items-start ">
          <div class="flex" v-for="(sub, i) in subtasks" :key="i">
            <input 
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 my-1"
            id="subt"
            type="text"
            placeholder="Subtask"
            v-model="subtasks[i].title"
          />
          <button @click="delSubTaskClick(i)" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-1 font-semibold py-2 px-4 mx-1 border border-gray-400 rounded shadow">
            Del
          </button>
          </div>
          
          
        </div>
        <button @click="addSubTaskClick()" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow">
            Add Subtask
          </button>
      </div>
      <div class="flex justify-center md:w-full px-3">
        <button @click="onCreateBtnClick()" class="bg-gray-600 hover:bg-gray-700 block uppercase tracking-wide text-white text-base mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow" :disabled="title===''">
            Updata Task
          </button>
      </div>     
    </div>
   
    <!-- <div v-if="vm.undones>0">Task not finished {{ vm.undones}}</div>
    <div v-else-if="vm.todos.length>0">All tasks are done!</div>
    <div v-else>No tasks!</div> -->

    
  </section>
</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";
import VueyeDatepicker from "vueye-datepicker";
// import todoList from "./todoList";

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "updataTaskForm", 
  components: {
    VueyeDatepicker,
  },
  props: ['sub'],
  data() {
    return {
      title: "",
      description: "",
      disabled: false,
      visibleDate: true,
      nameOfDateButton: "No date",
      date: {
        value: new Date(),
        formattedValue: "",
      },
    //   index: todoList.data.index,  
      index: "0",
      subtasks: [],  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      vm: store, //хранилище как свойство vm      
    };
  },
  methods: {
    onCreateBtnClick(){
      //this.addNewTodo();
      console.log(this.vm.todos[this.index].title);
      console.log('this.vm.todos: ', this.vm.todos);
    },

    addNewTodo() {        
      if (this.title !== "") {
        this.vm.addTodo(this.title, this.description, this.date.formattedValue, this.subtasks);
        this.title = "";
        this.description = "";
        this.subtasks = [];        
      }
    },
    
    alertFullTitleField(){ //изменить цвет рамки Title на красный !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    },

    addSubTaskClick() {
      if (this.subtasks.length < 10){
        this.subtasks.push({title: ""});
        console.log('subtasks: ', this.subtasks);
      }else{
        alert("Егор не разрешает более 10 подзадач");
      }     
    },

    delSubTaskClick(i){
      this.subtasks.splice(i, 1);
    },

    removeDateClick(){      
      this.visibleDate = !this.visibleDate;
      if (!this.visibleDate){
        this.nameOfDateButton = "Set date";
        this.date.value = "";
        this.date.formattedValue = "";
      } else{
        this.nameOfDateButton = "No date";
      }

      
      
    }
    
  },
});

</script>
<style>
</style>
