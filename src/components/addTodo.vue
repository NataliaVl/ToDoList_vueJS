<template>
  <section class="px-64">
    <!-- <div v-if="!isHidden" id="test_id">HELLO</div> -->
    <!-- <button @click="() => {isHidden = !isHidden}">{{isHidden?'SHOW':'HIDE'}}</button> -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="title"
          >Name</label>
          <input
            v-model="title"
            placeholder="Task"
            class="appearance-none block w-full  text-grey-darker border border-red rounded py-3 px-4 mb-3"
            :class="{'border-red-600': titleTaskEmpty, 'bg-grey-lighter': !titleTaskEmpty}"
            id="title"
            type="text"
            @input="checkTitleTaskEmpty()"
          />
          <p class=" text-xs italic"
          :class="{'text-red-600': titleTaskEmpty, 'text-grey-600': !titleTaskEmpty}"
          >Please fill out this field.</p>
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="completion-date"
          >Date</label>
          <div class="flex justify-between">
            <vueye-datepicker
              v-if="visibleDate"
              v-model="date"
              placeholder="Date"
              color="#4466ee"
              format="dd-mm-yyyy"
              class="py-3 px-4"
            />
            <button
              @click="removeDateClick()"
              class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow"
            >{{nameOfDateButton}}</button>
          </div>
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="description"
          >Description</label>
          <input
            v-model="description"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="description"
            type="text"
            placeholder="Description"
          />
          
        </div>
      </div>
      <div class="flex">
        <div class=" md:w-2/3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        >Subtasks</label>
        <div class="flex flex-col items-start">
          <div class="flex" v-for="(sub, i) in subtasks" :key="i">
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 my-1"
              id="subt"
              type="text"
              placeholder="Subtask"
              v-model="subtasks[i].title"
            />
            <button
              @click="delSubTaskClick(i)"
              class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-1 font-semibold py-2 px-4 mx-1 border border-gray-400 rounded shadow"
            >Del</button>
          </div>
        </div>
        <button
          @click="addSubTaskClick()"
          class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow"
        >Add Subtask</button>
      </div>

      <div class=" md:w-1/3 mb-6 md:mb-0 justify-center">     
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        >Priority</label>   
        <div class="flex md:w-full content-end">
          <button
          @click="selectPriority(0)"
          class="bg-white hover:bg-red-700 hover:text-white block uppercase tracking-wide text-red-600 text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-red-700 rounded shadow"
          >high</button>
          <button
          @click="selectPriority(1)"
          class="bg-white hover:bg-yellow-700 hover:text-white block uppercase tracking-wide text-yellow-700 text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-yellow-700 rounded shadow"
          >medium</button>
          <button
          @click="selectPriority(2)"
          class="bg-white hover:bg-green-700 hover:text-white block uppercase tracking-wide text-green-600 text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-green-700 rounded shadow"
          >low</button>
          <button
          @click="selectPriority(3)"
          class="bg-white hover:bg-indigo-700 hover:text-white block uppercase tracking-wide text-indigo-700 text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-indigo-700 rounded shadow"
          >no</button>
        </div>
        
      </div>
      </div>
      

      <div class="flex justify-center md:w-full px-3">
        <button
          @click="onCreateBtnClick()"
          class="bg-gray-600 hover:bg-gray-700 block uppercase tracking-wide text-white text-base mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow"
          :disabled="title===''"
        >Add Task</button>
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
  name: "addNewTaskForm",
  components: {
    VueyeDatepicker,
  },
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

      subtasks: [], 
      vm: store, //хранилище как свойство vm
      isHidden: false,
      titleTaskEmpty: true,
      priority: {position: 3, title: "no"},
      hashtag: []
    };
  },
  methods: {
    onCreateBtnClick() {
      this.selectHashtag();
      this.addNewTodo();
    },

    addNewTodo() {
      if (this.title !== "") {
        this.vm.addTodo(
          this.title,
          this.description,
          this.date.formattedValue,          
          this.subtasks,
          this.priority,
          this.hashtag
        );
        this.title = "";
        this.description = "";
        this.subtasks = [];
        this.priority =  {position: 3, title: "no"};
        this.hashtag = [];
      }
    },
 
    selectPriority(i){
      switch (i){
        case 0: 
          this.priority = {position: 0, title: "high"};
          break;
        case 1: 
          this.priority = {position: 1, title: "medium"};
          break;
        case 2: 
          this.priority = {position: 2, title: "low"};
          break;
        case 3: 
          this.priority = {position: 3, title: "no"};
          break;        
      }
    },

    selectHashtag(){
      let arrDescr = this.description.split(' ');

      for (let index = 0; index < arrDescr.length; index++) {   
        if (arrDescr[index].startsWith("#")) {
          if(arrDescr[index].length > 1){
            this.hashtag.push(arrDescr[index]); 
          }                   
        }
      }
    },

    addSubTaskClick() {
      if (this.subtasks.length >= 10) {
         alert("Егор не разрешает более 10 подзадач");
         return;
      }
      if (this.subtasks.length !== 0 && this.subtasks[this.subtasks.length-1].title === '') {
        alert("заполните последнюю подзадачу");
         return;
      }
      this.subtasks.push({ title: "", flag: false });       
    },

    delSubTaskClick(i) {
      this.subtasks.splice(i, 1);
    },

    removeDateClick() {
      this.visibleDate = !this.visibleDate;
      if (!this.visibleDate) {
        this.nameOfDateButton = "Set date";
        this.date.value = "";
        this.date.formattedValue = "";
      } else {
        this.nameOfDateButton = "No date";
      }
    },
    checkTitleTaskEmpty() { 
      if (this.title.length == 0) this.titleTaskEmpty = true;
      else this.titleTaskEmpty = false;
    },
  },
});
</script>
<style scoped lang="css">
#test_id {
  color: red;
}
</style>
