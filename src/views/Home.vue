<template>
  <div class="home">  
      
    <!-- <todoList/> -->
    <undoneTask onDataChange=onDataChange/>
    <addNewTaskForm myData=myData/>
  </div>
</template>

<script>
// @ is an alias to /src
// import todoList from '@/components/todoList.vue'
import undoneTask from '@/components/undoneTask.vue'
import addNewTaskForm from '@/components/addTodo.vue'
import addNewTaskForm from '@/components/u.vue'

export default {
  name: 'Home',
  components: {
    // todoList,
    addNewTaskForm,
    undoneTask
  },

  method: {
    onDataChange(newId) {
        this.myData.id = newId;
    }
  }
}
</script>
