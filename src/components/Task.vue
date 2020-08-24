<template>
        <div
          class="task-item bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid border-l-8  my-2"
          :class="{'border-red-600': !todo.isDone, 'border-green-600': todo.isDone}" 
        >
          <div class="w-full">
            <div class="p-4 md:p-5 bg-gray-100">
              <div class="flex justify-between items-center">
                
                <div>
                  <div>                  
                

                  <input type="checkbox" class="form-checkbox text-green-600 h-8 w-8" @click="checkboxClick(todo.id)" :checked="todo.isDone">

                  <!-- <div class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                <input type="checkbox" class="bg-white" @click="checkboxClick()">
                <svg v-if="checkBox" class="w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg> -->
                  </div>

                  <p class="font-bold text-xl">{{todo.title}}</p>
                  <div class="flex items-start">
                    <span class="text-gray-700">{{todo.description}}</span>
                  </div>
                </div>
                <div class="flex content-center ">
                  <div class="flex flex-col mx-5 ">
                    <span class="text-gray-700 font-light uppercase">Дата выполнения задачи</span>
                    <span class="text-gray-700 font-light uppercase">{{todo.date}}</span>
                  </div>
                  <button
                    class=" bg-gray-600 hover:bg-gray-700 block uppercase tracking-wide text-white text-base font-semibold py-2 px-4  border border-gray-400 rounded shadow"
                    @click="vm.changeTask(todo.id)"
                  >change task</button>
                </div>
              </div>
              <div class="flex flex-col ml-6">
                <div class="block content-start">
                <label v-if="todo.subtasks.length !== 0"
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="title"
                >Подзадачи</label>
                </div>
                <div v-for="(sub,j) in todo.subtasks" :key="j" class="block ">
                  <div>
                    <input type="checkbox" class="form-checkbox text-green-600 h-4 w-4" @click="changeSubFlag(todo.id, j)" :checked="todo.subtasks[j].flag">
                    {{sub.title}} 
                  </div>                
                </div>
              </div>
              
              
            </div>
          </div>
          
        </div>
</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";


// import { delete } from "vue/types/umd";

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "task", 
  components: { 
    
    },
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
      console.log('this.todos[id].subtasks[j].flag1: ', this.todo.subtasks[j].flag);
      this.todo.subtasks[j].flag = !this.todo.subtasks[j].flag;
      console.log('this.todos[id].subtasks[j].flag2: ', this.todo.subtasks[j].flag);
      // this.vm.changeSubFlag(id, j);
      console.log('id: ', id);
      console.log('j: ', j);
    }
  },
  
});

</script>
