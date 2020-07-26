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
            placeholder="New Task"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="title"
            type="text"
          />
          <p class="text-red text-xs italic">Please fill out this field.</p>
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="completion-date"
          >Дата выполнения задачи</label>
          <vueye-datepicker v-model="date" placeholder="Date" color="#4466ee" format="dd-mm-yyyy" />
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
        <div class="flex items-start">
          <button @click="hideInput()" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow">
            Add
          </button>
          <input v-if="inputVisibility"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="subt"
            type="text"
            placeholder="Подзадача"
          />
        </div>
      </div>
      <!-- <div class="-mx-3 md:flex mb-2">
    
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
        State
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder="90210">
    </div>
      </div>-->
    </div>

    <div class="adding">
      <input type="text" />
      <br />
      <button id="btnAdd" @click="addNewTodo()" :disabled="title===''">Add</button><!-- КАК НАВЕСИТЬ 2 СОБЫТИЯ НА КНОПКУ????   -->
    </div>
    <div v-if="vm.undones>0">Task not finished {{ vm.undones}}</div>
    <div v-else-if="vm.todos.length>0">All tasks are done!</div>
    <div v-else>No tasks!</div>

    
  </section>
</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";
import VueyeDatepicker from "vueye-datepicker";

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "addTodo",
  components: {
    VueyeDatepicker,
  },
  props: ['sub'],
  data() {
    return {
      title: "",
      description: "",
      disabled: false,
      date: {
        value: new Date(),
        formattedValue: "",
      },
      inputVisibility: false,
      //subtasks: [],  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      vm: store, //хранилище как свойство vm      
      // subtasks: {    ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //   title: ""
      // }
    };
  },
  methods: {
    addNewTodo() {
      //addSubtasck();
      let s = document.getElementById('subt').value;
      let subtasks = [];
      subtasks.push(s);
      console.log('s: ', s);
      console.log(subtasks);




      if (this.title !== "") {
        // this.vm.addTodo(this.title, this.description, this.date.formattedValue, this.subtasks); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
        this.vm.addTodo(this.title, this.description, this.date.formattedValue);
        this.title = "";
        this.description = "";
        this.date.value = "";
        this.date.formattedValue = "";
      }
    },
    
    
    hideInput() {
      this.inputVisibility ? this.inputVisibility = false : this.inputVisibility = true;
    },
    
  },
});

</script>
<style>
</style>
