<template>
  <div class="flex flex-col">
    <section class="block w-full">
      <!-- !!!! -->
      <div class="w-full mt-2 items-center justify-center">
        <!-- !!! -->
        <div class="flex bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid my-2">
          <div v-on:click="onClickFolder" class="flex w-full">
            <div class="flex w-full items-center p-4 md:p-5 bg-gray-100">
              <div class="flex flex-1 items-center">
                <div class="flex mr-3">                  
                  <svg v-if="showProjects"
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
                      d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                    />
                  </svg>
                  <svg v-else
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="flex">
                    <p class="font-bold text-xl">{{folder.title}}</p>
                  </div>
                  <div class="flex items-start">
                    <span class="text-gray-700">{{folder.description}}</span>
                  </div>
                </div>
              </div>
              <div class="flex w-ful justify-between items-center">
                <div class>
                  <button
                    id="editFolder"
                    @click="vm.changeFolder(folder.id)"
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
                    @click="deleteFolder(folder.id)"
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
      </div>
    </section>

    <section class="w-full">
      <projectsBelongingFolder v-if="showProjects" :folder="folder" class="" />
    </section>
  </div>
</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";
import projectsBelongingFolder from "@/components/projectsBelongingFolder.vue";

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "folder",
  components: {
    projectsBelongingFolder,
  },
  props: ["folder"],
  data() {
    return {
      title: "",
      description: "",
      vm: store,
      titleFolderEmpty: true,
      showProjects: false,
    };
  },
  methods: {
    deleteFolder(id) {
      this.vm.delFolder(id);
    },
    onClickFolder() {
      this.showProjects = !this.showProjects;
    },
  },
});
</script>

<style>
</style>