import { observable } from "mobx";

// ГЕНЕРАЦИЯ UUID
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

export default class Node {
    id = uuidv4(); // UUID
    @observable title;  
    @observable description;  
    @observable date;  
    @observable isDone = false;
    @observable subtasks; 
    constructor(title, description, date, subtasks) {
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
