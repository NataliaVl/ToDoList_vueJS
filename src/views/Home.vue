<template>
  <div class="home">  
      
    <!-- <todoList/> -->
    <undoneTask @taskId="Id=$event"/>    <!-- <undoneTask onDataChange=onDataChange/> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
    <doneTask/>
    <addNewTaskForm/>     <!-- <addNewTaskForm myData=myData/> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->   
    <!-- <updataTaskForm/> -->
    <p>{{Id}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import todoList from '@/components/todoList.vue'
import undoneTask from '@/components/undoneTask.vue'
import doneTask from '@/components/doneTask.vue'
import addNewTaskForm from '@/components/addTodo.vue'

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
      Id:"hjksdfk"
    }
  },
  method: {
    // onDataChange(newId) { !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     this.myData.id = newId;
    // }
  }
}
</script>
