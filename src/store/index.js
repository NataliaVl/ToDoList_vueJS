import { action,computed,observable } from 'mobx';
import Todo from './note';
export default class TodoList{
    @observable 
    todos= {};
    @computed
    get undones(){
        return this.todos.filter(note => !note.isDone).length;
    } 
    @action
    addTodo(title, description, date, subtasks){
        let task = new Todo(title, description, date, subtasks);
        this.todos[task.id] = task;
    }
    @action
    removeTodo(id){
        this.todos = this.todos.filter(item=>item.id!==id);
    }
    @action
    changeFlag(i){     
        console.log('i: ', i);   
        console.log('i: ', this.todos);   
        this.todos[i].isDone = !this.todos[i].isDone;
        
    }
    
}
export const store = new TodoList();