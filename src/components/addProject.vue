<template>
  <section class="">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-2 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="title"
          >Name</label>
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
            >Description</label>
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
    },

    addNewProject() {
      if (this.title !== "") {
        this.vm.addNewProject(
          this.title,
          this.description,     
          this.selectedFolder.id     
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