<template>
<div>
    <section>
      
    <div class="px-64 w-full items-center justify-center">
      <div class="w-full px-2 mt-2">
        <Task  
          v-for="todo in correctToDo"
          :key="todo.id"
          :todo="todo"
          class="task-item bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid border-l-8 border-red-600 my-2"
        >
        </Task>
      </div>
    </div>
    </section>
    <section v-if="!vm.change_form.isDone">
      <updataTaskForm v-if="vm.change_form.flag" />
    </section>
   
</div>
</template>


<script>
// import _ from 'lodash';
import { observer } from "mobx-vue";
import { store } from "@/store/index";
import Task from './Task';
import updataTaskForm from '@/components/updataTodo.vue'
import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

export default observer({
  name: "undoneTask",
  components: {
    Task,
    updataTaskForm
  },
  // props: ['onDataChange'], //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  data() {
    return { 
      vm: store ,
      correctTodo: [],
      id: "",
      change: false,
      sortArray: []
      };
  },
  computed: {
    correctToDo() {
      console.log('gggggggggggggggggg: ');
      let arr = this.getCorrectTodo().sort((a, b) => { return b.priority.position - a.priority.position;});
      
      console.log('arr: ', arr);
      return arr;
    }
  },
  methods: {
    removeTodo(id) {
      this.vm.removeTodo(id);
    },
    checkboxClick(i){      
      this.vm.changeFlag(i);
    },

    sortPrioprities(array){
      if (Object.keys(this.vm.todos).length === 0 || Object.keys(this.vm.todos).length === 1) return this.vm.todos;

      for (let task in this.vm.todos){
        console.log('task.priority[1]: ', this.vm.todos[task].priority.position);

        


        let max = this.vm.todos[task].priority.position; // максимальное значение (будем всегда ставить в начало)
        // let k = task;// индекс текущего максимума
        for (let prop in this.vm.todos) {
          if(prop )
          if(max < this.vm.todos[task + 1].priority.position){
            max = this.vm.todos[task + 1].priority.position;
            
        }
        }

      }


      if (array.length === 0 || array.length === 1) return array;

      for (let j = 0; j < array.length-1; j++) {
        let max = array[j]; // максимальное значение (будем всегда ставить в начало)
        let k = j; // индекс текущего максимума
        for (let i = j+1; i < array.length; i++) {
          if (max < array[i]) {
          max = array[i];
          k = i;
          }
        }
        // ставим максимум на "первую" позицию
        let obmen = array[j];
        array[j] = max;
        array[k] = obmen;
      }
      return array;
    },
   
    getCorrectTodo(){  
      this.correctTodo =   Object.values(this.vm.todos).filter(value => !(value.isDone));
      // console.log('this.vm.todos: ', this.vm.todos);   
      // console.log(this.sortPrioprities([5, 4, 2, 0,8]) );
      
      return this.correctTodo;
    },
   
  },
});
</script>

