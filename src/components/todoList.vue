<template>
  <section>
    <div class="px-64 w-full items-center justify-center">
      <div class="w-full px-2 mt-2">
        <div
          v-for="todo in vm.todos"
          :key="todo.key"
          class="task-item bg-white shadow-xl rounded-lg overflow-hidden md:flex border-solid border-l-8 border-green-600 my-2"
        >
          <div class="w-full">
            <div class="p-4 md:p-5 bg-gray-100">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-bold text-xl">{{todo.title}}</p>
                  <div class="flex items-start">
                    <span class="text-gray-700">{{todo.description}}</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-start">
                    <span class="text-gray-700">{{todo.date}}</span>
                  </div>
                  <button
                    class="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-red-700 hover:bg-red-600 font-bold text-white rounded-lg shadow-md"
                  >03:37:22</button>
                </div>
              </div>
              <div class="flex flex-col ml-6">
                <div class="block content-start">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="title"
                >Подзадачи</label>
                </div>
                <div v-for="(sub,i) in todo.subtasks" :key="i" class="block ">
                {{sub.title}}                 
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <addNewTaskForm />
  </section>
</template>
<script>
import { observer } from "mobx-vue";
import { store } from "@/store/index";
import addNewTaskForm from "./addTodo";

export default observer({
  name: "todo",
  components: {
    addNewTaskForm,
  },
  data() {
    return { vm: store };
  },
  methods: {
    removeTodo(id) {
      this.vm.removeTodo(id);
    },
  },
});
</script>
