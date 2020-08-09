<template>
<div>
    <section>
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
     <section>
    <div class="px-64 w-full items-center justify-center">
      <div class="w-full px-2 mt-2">
        <Task
          v-for="todo in doneTask()"
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
import { observer } from "mobx-vue";
import { store } from "@/store/index";
import Task from './Task';

export default observer({
  name: "undoneTask",
  components: {
    Task
  },
  props: ['onDataChange'],
  data() {
    return { 
      vm: store ,
      correctTodo: []
      };
  },
  methods: {
    removeTodo(id) {
      this.vm.removeTodo(id);
    },
    checkboxClick(i){      
      this.vm.changeFlag(i);
    },
    getCorrectTodo(){
  
      this.correctTodo =   Object.values(this.vm.todos).filter(value => !(value.isDone));
      return this.correctTodo;
    },
    doneTask(){
      this.onDataChange(5);
      this.correctTodo =  Object.values(this.vm.todos).filter(value => (value.isDone));
      // if(this.vm.todos[id].isDone){
      //   this.correctTodo = this.vm.todos.filter(list => )
      // }
      return this.correctTodo;
    }
  },
});
</script>

