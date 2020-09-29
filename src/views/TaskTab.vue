<template>
  <div>
    <div class="taskTab">
    <ul class="flex border-b px-64">
      <li
        v-for="tab in tabs"
        v-bind:key="tab.name"
        v-bind:class="['tab-button', { active: currentTab.name === tab.name }]"
        v-on:click="currentTab = tab"
        class="  mr-1"
      >
        <a
          href="#"
          
          class="font-semibold"
        >{{ tab.name }}</a>
      </li>
    </ul>
    <component v-bind:is="currentTab.component" class="tab"></component>
    </div>
  </div>
</template>

<script>
import { store } from "@/store/index";
import undoneTask from "@/components/undoneTask.vue";
import doneTask from "@/components/doneTask.vue";
import addNewTaskForm from "@/components/addTodo.vue";
import searchTaskByHashtag from "@/components/SearchTaskByHashtag.vue";

import updataTaskForm from "@/components/updataTodo.vue";

let tabs = [
  {
    name: "Add Task",
    component: addNewTaskForm,
  },
  {
    name: "Undone tasks",
    component: undoneTask,
  },
  {
    name: "Done tasks",
    component: doneTask,
  },
  {
    name: "Search for hashtags",
    component: searchTaskByHashtag,
  },
];

export default {
  name: "taskTab",

  components: {
    doneTask,
    undoneTask,
    addNewTaskForm,
    searchTaskByHashtag,
    updataTaskForm,
  },
  data() {
    return {
      vm: store,
      tabs: tabs,
      currentTab: tabs[0],
    };
  },
};
</script>

<style>
      .tab-button {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;     
        color: #4299e1;
        background: #ffffff;
        
      }
      .tab-button:hover {
        background: #e0e0e0;
        color: #2c5282;
        
      }
      .tab-button.active {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-left-width: 1px;
        border-right-width: 1px;
        border-top-width: 1px;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        border-top-right-radius: 3px;
        color: #2b6cb0;
        background: #ffffff;

        margin-bottom: -1px;
      }
      
    </style>
