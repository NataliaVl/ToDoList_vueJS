<template>
  <div class="home">    
    <todoList/>
  </div>
</template>

<script>
// @ is an alias to /src
import todoList from '@/components/todoList.vue'

export default {
  name: 'Home',
  components: {
    todoList
  }
}
</script>
