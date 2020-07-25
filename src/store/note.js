import { observable } from "mobx";
export default class Node {
    id = Math.random();
    @observable title;    
    @observable isDone = false;
    constructor(title){
        this.title = title;
    }
}