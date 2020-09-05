<template>
  <div>
    <p class="uppercase text-grey-darker text-l font-bold">Папки</p>

    <section>
      <div class="flex justify-end px-64  w-full">
        <button 
          @click="showAddFolderForm()"
          class="bg-gray-600 mb-2 hover:bg-gray-700 block uppercase tracking-wide text-white text-sm font-normal py-2 px-2 border border-gray-400 rounded shadow mr-3 "
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
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>

      <addNewFolderForm v-if="showAddFolder" class="mr-3"/>

    </section>

    <section>
      <div class="px-64 w-full items-center justify-center">
        <!-- <div v-on:click="onClickFolder" class="w-full px-2 mt-2"> -->
        <div class="w-full px-2 mt-2">
          <Folder v-for="folder in vm.folders" :key="folder.id" :folder="folder"></Folder>
        </div>
      </div>
    </section>
    <section>
      <div>
        <updateFolderForm v-if="vm.change_folder_form.flag" />
      </div>
    </section>
  </div>
</template>

<script>
import { observer } from "mobx-vue";
import { store } from "@/store/index";
import Folder from "@/components/Folder.vue";
import updateFolderForm from "@/components/updateFolder.vue";
import addNewFolderForm from "@/components/addFolder.vue";

export default observer({
  name: "allFolder",
  components: {
    Folder,
    updateFolderForm,
    addNewFolderForm,
  },

  data() {
    return {
      vm: store,
      showAddFolder: false
    };
  },
  methods: {
    onClickFolder() {
      alert("boom2");
    },
    showAddFolderForm(){
      this.showAddFolder = !this.showAddFolder;
    }
  },
});
</script>

<style>
</style>