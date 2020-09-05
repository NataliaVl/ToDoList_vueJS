<template>
  <section class="">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-2 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="title"
          >Название</label>
          <input
            v-model="title"
            placeholder="Project"
            class="appearance-none block w-full  text-grey-darker border border-red rounded py-3 px-4 mb-3"
            :class="{'border-red-600': titleProjectEmpty, 'bg-grey-lighter': !titleProjectEmpty}"
            id="title"
            type="text"
            @input="checkTitleProjectEmpty()"
          />
          <p class=" text-xs italic"
          :class="{'text-red-600': titleProjectEmpty, 'text-grey-600': !titleProjectEmpty}"
          >Please fill out this field.</p>
        </div>  
        <div class=" -mx-3 md:w-full ">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="description"
            >Описание</label>
            <input
              v-model="description"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="description"
              type="text"
              placeholder="Description"
            />
          </div>
        </div> 
      </div>
           
      <!-- <div class="w-full md:w-1/3  mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        папка
      </label>
      <div class="relative">
        <select v-model="selectedFolder"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option disabled value="">Выберите один из вариантов</option>
          <option v-for="folder in this.vm.folders" :key="folder.id" :value="{id: folder.id}">{{folder.title}}</option>          
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
       <button
              @click="delSubTaskClick(i)"
              class="bg-gray-600 mb-2 hover:bg-gray-700 block uppercase tracking-wide text-white text-sm font-normal py-2 px-2 border border-gray-400 rounded shadow"
            >
            <svg class="stroke-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
</svg>
</button>
    </div> -->

      <div class="flex justify-center md:w-full px-3">
        <button
          @click="onCreateBtnClick()"
          class="bg-gray-600 hover:bg-gray-700 block uppercase tracking-wide text-white text-base mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow"
          :disabled="title===''"
        >Add Project</button>
      </div>
    </div>
  </section>

</template>

<script>
import { observer } from "mobx-vue";
import Vue from "vue";
import { store } from "@/store/index";
// import { delete } from "vue/types/umd";

Vue.config.keyCodes.atsign = 50;
export default observer({
  name: "addNewProjectForm",
  components: {
  },
  props: ["folder"],
  data() {
    return {
      title: "",
      description: "",
      disabled: false,   
      vm: store, //хранилище как свойство vm
      titleProjectEmpty: true,
      selectedFolder: ''      
    };
  },
  methods: {
    onCreateBtnClick() {
      this.addNewProject();
      this.vm.addProjectToFolder(this.folder.id, this.vm.idProjectBelongingFolder);
      // this.vm.addProjectToFolder(this.selectedFolder.id, )
    },

    addNewProject() {
      if (this.title !== "") {
        this.vm.addNewProject(
          this.title,
          this.description,     
          this.selectedFolder.id     //!!!
        );
        this.title = "";
        this.description = "";  
        this.selectedFolder = "";      
      }
    },
    checkTitleProjectEmpty() { 
      if (this.title.length == 0) this.titleProjectEmpty = true;
      else this.titleProjectEmpty = false;
    },
    getTitlefolders(){
      this.vm.folders
      
    }
  },
});
</script>
<style scoped lang="css">
#test_id {
  color: red;
}
</style>