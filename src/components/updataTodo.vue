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
            v-model="vm.change_form.title"
            placeholder="Task"
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
          <div class="flex justify-between">
          <vueye-datepicker v-if="visibleDate" v-model="vm.change_form.date" placeholder="Date" color="#4466ee" format="dd-mm-yyyy" class="py-3 px-4"/>          
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
            v-model="vm.change_form.description"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="description"
            type="text"
            placeholder="Description"                   
          />
        </div>
      </div>

      <div class="md:w-1/2 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"          
        >Подзадачи</label>
        <div class="flex flex-col items-start ">
          <div class="flex" v-for="(sub, i) in vm.change_form.subtasks" :key="i">
            <input 
            v-model="vm.change_form.subtasks[i].title"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 my-1"
            type="text"
            placeholder="Subtask"
            
          />
          <button @click="delSubTaskClick(i)" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-1 font-semibold py-2 px-4 mx-1 border border-gray-400 rounded shadow">
            Del
          </button>
          </div>
          
          
        </div>
        <button @click="addSubTaskClick" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow">
            Add Subtask
          </button>
      </div>
      <div class="flex justify-center md:w-full px-3">
        <button @click="onUpdateBtnClick" class="bg-gray-600 hover:bg-gray-700 block uppercase tracking-wide text-white text-base mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow">
            Updata Task
          </button>
      </div>     
    </div>
       
  </section>
</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";
import VueyeDatepicker from "vueye-datepicker";

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "updataTaskForm", 
  components: {
    VueyeDatepicker,
  },

  data() {
    return {
      description: "",
      disabled: false,
      visibleDate: true,
      nameOfDateButton: "No date",
      date: {
        value: new Date(),
        formattedValue: "",
      }, 
      index: "0",
      vm: store,  
    };
  },
  methods: {
    onUpdateBtnClick(){
       this.vm.updateTodos();
    },
    
    addSubTaskClick() {
      if (this.vm.change_form.subtasks.length >= 10) {
         alert("Егор не разрешает более 10 подзадач");
         return;
      }

      if (this.vm.change_form.subtasks.length !== 0 && this.vm.change_form.subtasks[this.vm.change_form.subtasks.length-1].title === '') {
        alert("заполните последнюю подзадачу");
         return;
      }
      this.vm.addSub();
      // this.vm.change_form.subtasks.push({ title: "" });
       
    },

    delSubTaskClick(i){
      // this.subtasks.splice(i, 1);
      this.vm.delSub(i);
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
    },    
  },
});

</script>
<style>
</style>
