<template>
  <section class="px-64">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="title"
          >Name</label>
          <input          
            v-model="vm.change_form.title"
            placeholder="Task"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
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
          >Description</label>
          <input
            v-model="vm.change_form.description"
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="description"
            type="text"
            placeholder="Description"                   
          />
        </div>
      </div>
        
      <div class="flex">
        <div class="md:w-2/3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"          
          >Subtasks</label>
          <div class="flex flex-col items-start ">
            <div class="flex" v-for="(sub, i) in vm.change_form.subtasks" :key="i">
              <input 
              :value="vm.change_form.subtasks[i].title"
              @change="e => change_form_input(e.target.value,i)"
              class="appearance-none block w-full .bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 my-1"
              type="text"
              placeholder="Subtask"
              
            />
            {{vm.change_form.subtasks[i].title}}
            <button @click="delSubTaskClick(i)" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-1 font-semibold py-2 px-4 mx-1 border border-gray-400 rounded shadow">
              Del
            </button>
            </div>  
          </div>
          <button @click="addSubTaskClick" class="bg-white hover:bg-gray-100 block uppercase tracking-wide text-grey-darker text-xs font-bold my-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow">
              Add Subtask
            </button>
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
      newHash: "",
      disabled: false,
      visibleDate: true,
      nameOfDateButton: "No date",
      date: {
        value: new Date(),
        formattedValue: "",
      }, 
      index: "0",
      vm: store,        
      titleTaskEmpty: true, 
    };
  },
  methods: {
    onUpdateBtnClick(){
      this.selectHashtag();
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

    selectHashtag(){
      let arrDescr = this.vm.change_form.description.split(' ');
      this.vm.change_form.hashtag.length = 0;
      for (let index = 0; index < arrDescr.length; index++) {   
        if (arrDescr[index].startsWith("#")) {
          if(arrDescr[index].length > 1){
            
            this.vm.change_form.hashtag.push(arrDescr[index]); 
          }                   
        }
      }
      // this.vm.change_form.hashtag = this.newHash;
    },

    selectPriority(i){
      switch (i){
        case 0: 
          this.vm.change_form.priority = {position: 0, title: "high"};
          break;
        case 1: 
          this.vm.change_form.priority = {position: 1, title: "medium"};
          break;
        case 2: 
          this.vm.change_form.priority = {position: 2, title: "low"};
          break;
        case 3: 
          this.vm.change_form.priority = {position: 3, title: "no"};
          break;        
      }
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

    checkTitleTaskEmpty() { 
      if (this.vm.change_form.title == 0) this.titleTaskEmpty = true;
      else this.titleTaskEmpty = false;
    },

    change_form_input(e, i){
      let arr = [];
      for( let i = 0; i<this.vm.change_form.subtasks.lenght; i++) {
          arr.push({title: this.vm.change_form.subtasks[i].title});
      }
      arr[i].title = e;
      this.vm.change_form.subtasks = [{title: e}];
    }
  },
});

</script>
<style scoped lang="css">
#test_id {
  color: red;
}
</style>
