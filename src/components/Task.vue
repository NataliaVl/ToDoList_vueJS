<template>
        <div
          class="task-item bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid border-l-8  my-2"
          :class="{'border-red-600': !todo.isDone, 'border-green-600': todo.isDone}" 
        >
          <div class="w-full">
            <div class="p-4 md:p-5 bg-gray-100">
              <div class="flex justify-between items-center">
                
                <div>
                  <div class="flex">                  
                

                  <input type="checkbox" class="mb-4 mr-3 form-checkbox text-green-600 h-8 w-8" @click="checkboxClick(todo.id)" :checked="todo.isDone">
                  

                  <p class="font-bold text-xl">{{todo.title}}</p>
                  </div>
                  <div class="flex items-start">
                    <span class="text-gray-700"> {{this.showDescrWithoutHashtag()}}</span> 
                  </div>
                </div>
                <div class="flex">
                  <div class="flex flex-col mx-5 ">
                    <span class="text-gray-700 font-light uppercase">Date</span>
                    <span class="text-gray-700 font-light uppercase">{{todo.date}}</span>
                  </div>
                  <button
                    class=" bg-gray-600 hover:bg-gray-700 block uppercase tracking-wide text-white text-base font-semibold py-2 px-4  border border-gray-400 rounded shadow"
                    @click="vm.changeTask(todo.id)"
                  >change task</button>
                </div>
              </div>
              <div class="flex">
                <div class="flex flex-col ml-6 md:w-1/3">
                  <div class="block content-start">
                    <label v-if="todo.subtasks.length !== 0"
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="title"
                    >Subtasks</label>
                  </div>
                  <div v-for="(sub,j) in todo.subtasks" :key="j" class="flex justify-start">
                    <div >
                      <input type="checkbox" class="form-checkbox text-green-600 h-4 w-4" @click="changeSubFlag(todo.id, j)" :checked="todo.subtasks[j].flag">
                      {{sub.title}} 
                    </div>                
                  </div>
                </div>
                <div class="flex md:w-full justify-end">
                  <span class=" font-bold p-2 m-2 text-xs font-light uppercase"
                  :class="{'text-red-700': todo.priority.position === 0,
                    'text-yellow-700': todo.priority.position === 1,
                    'text-green-700': todo.priority.position === 2,
                    'text-indigo-700': todo.priority.position === 3}" >
                  {{todo.priority.title}} priority</span>
                </div>
              </div>
              
              <section class="flex justify-start pt-3">
                <div v-for="(hash, i) in todo.hashtag" :key="i" class="flex inline-flex">
                    <span class="rounded-full bg-gray-400 px-2 py-1 text-xs font-bold mr-3">
                      {{hash}}
                    </span>
                  
                </div>
          </section>              
            </div>            
          </div>          
          
        </div>
</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "task", 
  props: ['todo'],
  data() {
    return {
     vm: store ,
      disabled: false,
      visibleDate: true,
      nameOfDateButton: "No date",
    };
  },
  methods: {
    checkboxClick(i){      
      this.vm.changeFlag(i);
    },
    changeSubFlag(id, j){
      this.todo.subtasks[j].flag = !this.todo.subtasks[j].flag;
    },
    showDescrWithoutHashtag(){
      let arrDescr = this.todo.description.split(' ');
      let arrDescriptionWithoutHashtag = arrDescr.filter(descr => !descr.startsWith("#"));
      return arrDescriptionWithoutHashtag.join(" ");      
    }
  },
  
});

</script>
