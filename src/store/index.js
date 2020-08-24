import { action,computed,observable } from 'mobx';
import Todo from './note';
export default class TodoList{
    @observable 
    todos= {};

    @observable 
    change_form= {
        flag: false,
        id: 0,
        title: '',
        description: '',
        date: '',
        subtasks: []
    };    

    @action
    changeTask(id){
        console.log('this.todos[id]: ', this.todos[id].subtasks); //        
        this.change_form = {            
            flag: true,
            id: id,
            title: this.todos[id].title,            
            description: this.todos[id].description,            
            subtasks: this.todos[id].subtasks, // ПОДЗАДАЧИ НЕ ИЗМЕНЯЮТСЯ, ПОЧЕМУ????????????????????????????????????
            date: this.todos[id].date, //ОТОБРАЖАЕТСЯ СЕГОДНЯШНЯЯ ДАТА, А НЕ СОХРАНЕННАЯ            
        };
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
    addTodo(title, description, date, subtasks){
        subtasks = subtasks.filter(x => x.title !== '');
        let task = new Todo(title, description, date, subtasks);        
        this.todos[task.id] = task;        
    }

    @action
    updateTodos(){
        console.log('this.change_form: ', this.change_form);
        this.todos[this.change_form.id].title = this.change_form.title;
        this.todos[this.change_form.id].description = this.change_form.description;
        this.todos[this.change_form.id].subtasks = this.change_form.subtasks; 
        this.change_form = {flag : false}; //после обновления задачи, форма исчезает
        console.log('this.change_form: ', this.change_form);
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