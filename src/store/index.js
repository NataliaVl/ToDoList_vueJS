import { action,computed,observable } from 'mobx';
import Todo from './task';
import Folder from './folder';
import Project from './project';
export default class TodoList{
    @observable 
    todos= {};

    @observable
    folders= {};

    @observable
    projects ={};

    @observable
    idProjectBelongingFolder = "";

    @observable 
    change_form= {
        flag: false,
        id: 0,
        title: '',
        description: '',
        date: '',
        subtasks: [],
        hashtag: [],
        priority: {},
        isDone: ''
    };    

    @observable
    change_folder_form={
        flag: false,
        id: 0,
        title: '',
        description: '',
        idProject: []
    }

    @observable
    change_project_form = {
        flag: false,
        id: 0,
        title: '',
        description: '',
    }

    @action
    changeTask(id){
        console.log('this.todos[id]: ', this.todos[id].subtasks); //        
        this.change_form = {            
            flag: true,
            id: id,
            title: this.todos[id].title,            
            description: this.todos[id].description,            
            subtasks: this.todos[id].subtasks, // ПОДЗАДАЧИ НЕ ИЗМЕНЯЮТСЯ, ПОЧЕМУ????????????????????????????????????
            date: this.todos[id].date,      
            isDone: this.todos[id].isDone,
            hashtag: this.todos[id].hashtag,
            priority: this.todos[id].priority
        };
        console.log('this.todos[id].date,: ', this.todos[id].date,);
        console.log('this.change_form1: ', this.change_form); //
    }

    @action
    addSub(){
        this.change_form.subtasks.push({ title: "" });
    }

    @action
    delSub(i){
        this.change_form.subtasks.splice(i, 1);
    }

    @computed
    get undones(){
        return this.todos.filter(note => !note.isDone).length;
    } 


    @action
    addTodo(title, description, date, subtasks, priority, hashtag){
        subtasks = subtasks.filter(x => x.title !== '');
        let task = new Todo(title, description, date, subtasks, priority, hashtag);        
        this.todos[task.id] = task;        
    }

    @action
    updateTodos(){
        console.log('this.change_form: ', this.change_form);
        console.log('this.: ', this.todos);

        this.todos[this.change_form.id].title = this.change_form.title;
        this.todos[this.change_form.id].description = this.change_form.description;
        this.todos[this.change_form.id].subtasks = this.change_form.subtasks; 
        this.todos[this.change_form.id].priority = this.change_form.priority;
        this.change_form = {flag : false}; //после обновления задачи, форма исчезает
        console.log('this.change_form: ', this.change_form);
        console.log('this.todos: ', this.todos);
    }
    @action
    removeTodo(id){
        this.todos = this.todos.filter(item=>item.id!==id);
    }
    @action
    changeFlag(i){     
        this.todos[i].isDone = !this.todos[i].isDone;        
    }

    @action
    changeSubFlag(id, j){
        console.log('this.todos[id].subtasks[j].flag: ', this.todos[id].subtasks[j].flag);
        this.todos[id].subtasks[j].flag = !this.todos[id].subtasks[j].flag;
        console.log('this.todos[id].subtasks[j].flag: ', this.todos[id].subtasks[j].flag);
    }
    
    //FOLDER ACTION

    @action
    addNewFolder(title, description, idProject){        
        let folder = new Folder(title, description, idProject);        
        this.folders[folder.id] = folder;
    }

    @action
    delFolder(id){
        delete this.folders[id];
    }

    @action
    changeFolder(id){
        this.change_folder_form = {            
            flag: true,
            id: id,
            title: this.folders[id].title,
            description:this.folders[id].description,
            idProject: this.folders[id].idProject
        }
    }

    @action
    updateFolders(){
        this.folders[this.change_folder_form.id].title = this.change_folder_form.title;
        this.folders[this.change_folder_form.id].description = this.change_folder_form.description;
        this.folders[this.change_folder_form.id].idProject = this.change_folder_form.idProject;

        this.change_folder_form = {flag : false}; //после обновления задачи, форма исчезает
    }
    
    @action
    addProjectToFolder(idFolder, idProj){        
        this.folders[idFolder].idProject.push(idProj);
    }


    //PROJECT ACTION

    @action
    addNewProject(title, description, idFolder){
        let project = new Project(title, description, idFolder);
        this.projects[project.id]= project;

        this.assignProjectToFolder(project);
    }

    @action
    assignProjectToFolder(project){
        this.idProjectBelongingFolder = project.id;
    }

    @action
    delProject(id){
        delete this.projects[id];
    }

    @action
    changeProject(id){
        this.change_project_form = {            
            flag: true,
            id: id,
            title: this.projects[id].title,
            description:this.projects[id].description,
        }
    }

    @action
    updateProject(){
        this.projects[this.change_project_form.id].title = this.change_project_form.title;
        this.projects[this.change_project_form.id].description = this.change_project_form.description;

        this.change_project_form = {flag : false}; 
    }

    
    //ДЛЯ АСИНХРОННЫХ ДЕЙСТВИЙ
    // @observable
    // isFetching=false;

    //МЕТОД ЭМУЛИРУЮЩИЙ ЗАДЕРЖКУ ЗАПРОСА (АСИНХРОННЫЕ ДЕЙСТВИЯ)
    // @action 
    // addTodo(title, description, date, subtasks){
    //     this.isFetching = true;

    //     let _this = this;
    //     let f = async () => {
    //             setTimeout(() => {
    //                 subtasks = subtasks.filter(x => x.title !== '');
    //                 let task = new Todo(title, description, date, subtasks);
    //                 _this.todos[task.id] = task;
    //                 _this.isFetching = false;
    //             }, 1000);
    //         };
    //         f();
    //     console.log('isFetching: ', this.isFetching);
    // }
}


export const store = new TodoList();