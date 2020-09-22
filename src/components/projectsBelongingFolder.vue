<template>
  <div>
    
    <section id="show_Projects_Belonging_This_Folder"
    class="pl-8">
      <div class="w-full items-center justify-center">
        <div class="w-full px-2 mt-2">
          <Project v-for="project in getCorrectProjects()" :key="project.id" :project="project"></Project>
        </div>
      </div>
    </section>

    <section id="btn_Add_Project">
      <div class="flex justify-end w-full">
        <button
          @click="showAddProjectForm()"
          class="bg-gray-600 mb-2 hover:bg-gray-700 block uppercase tracking-wide text-white text-sm font-normal py-2 px-2 border border-gray-400 rounded shadow mr-3"
        >
          <svg
            class="stroke-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>          
        </button>
      </div>

      <addProjectForm 
      v-if="showAddProject"
      :folder="folder" 
      class="mr-3 px-0" />

    </section>
  </div>
</template>

<script>
import { observer } from "mobx-vue";
import { store } from "@/store/index";
import Project from "@/components/Project.vue";
import addProjectForm from "@/components/addProject.vue";

export default observer({
  name: "projectsBelongingFolder",
  components: {
    Project,
    addProjectForm
  },
  props: ["folder"],
  data() {
    return {
      vm: store,
      correctTodo: [],
      showAddProject: false
    };
  },
  methods: {
    getCorrectProjects() {
      this.correctTodo = Object.values(this.vm.projects).filter((value) =>
        this.folder.idProject.includes(value.id)
      );
      return this.correctTodo;
    },

    showAddProjectForm(){
      this.showAddProject = !this.showAddProject;
    }
  },
});
</script>