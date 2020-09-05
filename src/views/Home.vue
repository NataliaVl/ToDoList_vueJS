<template>
<div>
  <div class="home">    

    <addNewProjectForm/>

    <addNewFolderForm/>
    <allFolders/>

    <!-- <allProject/> -->


    <searchTaskByHashtag/>

    <undoneTask />  
    <doneTask/>
    <updataTaskForm v-if="vm.change_form.flag" />

    <addNewTaskForm/>   
    
    
  </div>
  <!-- <div v-else>
    обработка запроса
  </div> -->
  </div>
</template>

<script>
import { store } from "@/store/index";
import undoneTask from '@/components/undoneTask.vue'
import doneTask from '@/components/doneTask.vue'
import addNewTaskForm from '@/components/addTodo.vue'
import searchTaskByHashtag from '@/components/SearchTaskByHashtag.vue'
import addNewFolderForm from '@/components/addFolder.vue'
import allFolders from '@/components/allFolders.vue'
import updataTaskForm from '@/components/updataTodo.vue'
import addNewProjectForm from '@/components/addProject.vue'
// import allProject from '@/components/allProject.vue'

export default {
  name: 'Home',
  components: {
    // todoList,
    doneTask,    
    undoneTask,    
    addNewTaskForm,
    searchTaskByHashtag,
    addNewFolderForm,
    allFolders,
    updataTaskForm,
    addNewProjectForm,
    // allProject
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
