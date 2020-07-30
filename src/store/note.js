import { observable } from "mobx";
export default class Node {
    id = Math.random(); // UUID
    @observable title;  
    @observable description;  
    @observable date;  
    @observable isDone = false;
    @observable subtasks; 
    constructor(title, description, date, subtasks){
        this.title = title;
        this.description = description;
        this.date = date;
        this.subtasks = subtasks;
    }
}


// [
//     {title: ""},
//     {title: ""}
// ]

// let a = [
//     {id: 1, title: ""},
//     {id: 2, title: ""}
// ]
// for

// let b = {
//     1: {id: 1, title: ""},
//     2: {id: 2, title: ""}
// }
// b[5]

// {{projects[projectId].title}}
// {{getProjectTitle()}}

// func () {
//     forif id ==
//     return
