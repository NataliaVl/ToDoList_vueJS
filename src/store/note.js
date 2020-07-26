import { observable } from "mobx";
export default class Node {
    id = Math.random();
    @observable title;  
    @observable description;  
    @observable date;  
    @observable isDone = false;
    @observable subtasks = []; 
    constructor(title, description, date, subtasks){
        this.title = title;
        this.description = description;
        this.date = date;
        this.subtasks = subtasks;
    }
}