<template>
<div>
    <section>
      <p>несделанные задачи</p>
    <div class="px-64 w-full items-center justify-center">
      <div class="w-full px-2 mt-2">
        <Task  @taskId="id=$event" @changeTask="change=$event"
          v-for="todo in getCorrectTodo()"
          :key="todo.id"
          :todo="todo"
          class="task-item bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid border-l-8 border-red-600 my-2"
        >
        </Task>
        <p>{{id}}</p>
      </div>
    </div>
    </section>
    <section>
      <updataTaskForm v-if="vm.change_form.flag" />
    </section>
   
</div>
</template>

<script>
import { observer } from "mobx-vue";
import { store } from "@/store/index";
import Task from './Task';
import updataTaskForm from '@/components/updataTodo.vue'

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
      change: false
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
   
  },
});
</script>

