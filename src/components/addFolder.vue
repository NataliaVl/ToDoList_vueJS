<template>
  <section class="px-64 ">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-2 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="title"
          >Name</label>
          <input
            v-model="title"
            placeholder="Folder"
            class="appearance-none block w-full  text-grey-darker border border-red rounded py-3 px-4 mb-3"
            :class="{'border-red-600': titleFolderEmpty, 'bg-grey-lighter': !titleFolderEmpty}"
            id="title"
            type="text"
            @input="checkTitleFolderEmpty()"
          />
          <p class=" text-xs italic"
          :class="{'text-red-600': titleFolderEmpty, 'text-grey-600': !titleFolderEmpty}"
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
      
      
    <div >

    </div>


    <div
    v-for="project in getCorrectProjects()" :key="project.id" 
    class="md:w-1/3 block text-gray-600 font-bold"
    >
      <input 
      v-model="idProject" 
      :value="{id: project.id}"
      class="mr-2 leading-tight" type="checkbox">
      <span 
      class="text-sm">
        {{project.title}}
      </span>
    </div>
  

      <div class="flex justify-center md:w-full px-3">
        <button
          @click="onCreateBtnClick()"
          class="bg-gray-600 hover:bg-gray-700 block uppercase tracking-wide text-white text-base mb-2 font-semibold py-2 px-4 mr-2 border border-gray-400 rounded shadow"
          :disabled="title===''"
        >Add Folder</button>
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
  name: "addNewFolderForm",
  components: {
  },
  data() {
    return {
      title: "",
      description: "",
      disabled: false,   
      vm: store, //хранилище как свойство vm
      titleFolderEmpty: true,   
      idProject: []   ,
      arr:[],
      correctTodo:[]
    };
  },
  methods: {
    onCreateBtnClick() {
      this.addNewFolder();
    },

    getArrIdProject(){
      let arr = [];
      for (let proj in this.idProject){        
        arr.push(this.idProject[proj].id);
      }
      return arr;
    },

    addNewFolder() {
      let arrIdProject = this.getArrIdProject();
      
      if (this.title !== "") {
        this.vm.addNewFolder(
          this.title,
          this.description,
          arrIdProject  
        );
        this.title = "";
        this.description = ""; 
        this.idProject = [];       
      }
    },
    checkTitleFolderEmpty() { 
      if (this.title.length == 0) this.titleFolderEmpty = true;
      else this.titleFolderEmpty = false;
    },



    filterProjects(project){
      for (let i in this.vm.folders){
        if(this.vm.folders[i].idProject.includes(project.id)){
          return false;
        }else {
          return true;
        }      
      }

    },

    getCorrectProjects(){
      return this.vm.projects;      
    }
  },
});
</script>
<style scoped lang="css">
#test_id {
  color: red;
}
</style>