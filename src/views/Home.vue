<template>
<div>
  <!-- <div class="home" v-if="vm.isFetching === false">   -->
  <div class="home">    
    <!-- <todoList/> -->
    <undoneTask />    <!-- <undoneTask onDataChange=onDataChange/> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
    <doneTask/>
    <addNewTaskForm/>     <!-- <addNewTaskForm myData=myData/> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->   
    <!-- <updataTaskForm/> -->
    
  </div>
  <!-- <div v-else>
    обработка запроса
  </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import todoList from '@/components/todoList.vue'
import undoneTask from '@/components/undoneTask.vue'
import doneTask from '@/components/doneTask.vue'
import addNewTaskForm from '@/components/addTodo.vue'
import { store } from "@/store/index";

// import updataTaskForm from '@/components/updataTodo.vue'

export default {
  name: 'Home',
  components: {
    // todoList,
    doneTask,    
    undoneTask,    
    addNewTaskForm,
    // updataTaskForm
  },
  data() {
    return {
      vm: store, 
    }
  },
  method: {
    // onDataChange(newId) { !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     this.myData.id = newId;
    // }
  }
}
</script>
