<template>
  <div class="file">
    <allFolders/>
  </div>
</template>

<script>
import { store } from "@/store/index";
import allFolders from '@/components/allFolders.vue'
// import allProject from '@/components/allProject.vue'

export default {
  name: 'FileSystem',
  components: {    
    allFolders,
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
