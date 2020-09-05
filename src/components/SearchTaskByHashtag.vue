<template>
<div>
  <section>
    <div class="pt-2 mx-auto text-gray-600 flex justify-center">
    <span class="text-sm border border-2 border-gray-300 rounded-l-lg px-4 py-2 bg-gray-300 whitespace-no-wrap">Hashtag:</span>
    <div class="relative">
        <input v-model="hashtag" class="border border-2  bg-white px-4 py-2 rounded-r-lg text-sm  "
        type="text" name="search" placeholder="#hashtag">
    <button @click="searchHashtag()" class="absolute right-0 top-0 mt-3 mr-4">
        <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
    </button>
    </div>
    </div>
  </section>
  <section v-if="flag" class="mt-8">
    <h3 class="text-lg font-light  uppercase">Tasks with the specified hashtag "{{hashtag}}"</h3>
    <div class="px-64 w-full items-center justify-center">
      <div class="w-full px-2 mt-2">
        <Task  
          v-for="todo in getCorrectTodo()"
          :key="todo.id"
          :todo="todo"
          class="task-item bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid border-l-8 border-red-600 my-2"
        >
        </Task>
      </div>
    </div>
  </section>

    

</div>


</template>

<script>
// import { observer } from "mobx-vue";
import { store } from "@/store/index";
import Task from './Task';
// import updataTaskForm from '@/components/updataTodo.vue'
// import Vue from 'vue'

export default {
  name: "searchTaskByHashtag", 
  components: {
    Task,
    // updataTaskForm
  },

  props: ['todo'],

  data() {
    return {
      arrTaskByHash: [], 
      hashtag:"#",
      vm: store,  
      flag: false
    };
  },
  methods: {
    searchHashtag(){
      this.flag = true;
      // alert(this.hashtag);
      // console.log(this.vm.todos[0].hashtag[0]);
      // console.log('this.hashtag: ', this.hashtag);
    },

    iteratingValues(task){
      if(task.hashtag.includes(this.hashtag)) {
        return true;
        }
      else return false;
    },

    getCorrectTodo(){  
      this.correctTodo =   Object.values(this.vm.todos).filter(this.iteratingValues);      
      return this.correctTodo;
    },
  }
}
</script>

<style>

</style>