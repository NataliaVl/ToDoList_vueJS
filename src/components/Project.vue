<template>
<div>
<div class="bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid my-2">
    <div v-on:click="onClickProject" class="w-full">
      <div class="flex w-full items-center p-4 md:p-5 bg-gray-100">
        <div class="flex flex-1 items-center">
          <div class="flex mr-3">
            <svg
              class="h-16 w-16 stroke-current text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>            
          </div>
          <div>
            <div class="flex">
              <p class="font-bold text-xl">{{project.title}}</p>
            </div>
            <div class="flex items-start">
              <span class="text-gray-700">{{project.description}}</span>
            </div>
          </div>
        </div>
        <div class="flex w-ful justify-between items-center">
          <div class>
            <button
              id="editProject"
              @click="vm.changeProject(project.id)"
              class="bg-gray-600 mb-2 hover:bg-gray-700 block uppercase tracking-wide text-white text-sm font-normal py-2 px-2 border border-gray-400 rounded shadow"
            >
              <svg
                class="fill-current w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </button>
            <button
              id="delFolder"
              @click="deleteProject(project.id)"
              class="bg-red-800 hover:bg-red-900 block uppercase tracking-wide text-white text-sm font-normal py-2 px-2 border border-red-800 rounded shadow"
            >
              <svg
                class="fill-current w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

<section>
  <updateProjectForm v-if="vm.change_project_form.flag"/>
</section>

</div>
  
</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";
import updateProjectForm from "@/components/updateProject.vue"

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "Project",
  components: {
    updateProjectForm
  },
  props: ["project"],
  data() {
    return {
      title: "",
      description: "",
      vm: store,
      titleFolderEmpty: true,
    };
  },
  methods: {
    deleteProject(id) {
      this.vm.delProject(id);
    },
    onClickProject(){
      alert("вы нажали на проект");
    }
  },
});
</script>

<style>
</style>