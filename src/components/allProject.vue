<template>
  <div>
    <section class="pl-8">
      <p class="uppercase  text-grey-darker text-l font-bold ">Проекты</p>
    <div class="px-64 w-full items-center justify-center">
      <div class="w-full px-2 mt-2">
        <Project  
          v-for="project in vm.projects"
          :key="project.id"
          :project="project"
          class="bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid border-l-8 border-red-600 my-2"
        >
        </Project>
      </div>
    </div>
    </section>
    <section>
      <!-- <updateFolderForm v-if="vm.change_folder_form.flag" /> -->
    </section>
   
</div>
</template>

<script>
import { observer } from "mobx-vue";
import { store } from "@/store/index";
import Project from '@/components/Project.vue'
// import updateFolderForm from '@/components/updateFolder.vue'

export default observer({
  name: "allProject",
  components: {
    Project,
    // updateFolderForm
  },

  data() {
    return { 
      vm: store ,
      };
  },
  methods: {
  },
});
</script>

<style>

</style>