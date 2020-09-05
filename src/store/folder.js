import { observable } from "mobx";

// ГЕНЕРАЦИЯ UUID
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default class Folder {
  id = uuidv4(); // UUID
  @observable title;  
  @observable description;  
  @observable idProject; 
  
  constructor(title, description, idProject) {
    this.title = title;
    this.description = description;  
    this.idProject = idProject;  
  }
}