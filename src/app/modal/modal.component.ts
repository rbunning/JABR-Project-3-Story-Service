import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
// import { ConfirmModel } from './modal.interface';
import { Task } from '../task/task.interface'
import { TaskService } from '../task/task.service';
import { ModalService } from './modal.service';

export interface ModalModel {
  title:string;
  message:string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends DialogComponent<ModalModel, boolean> implements ModalModel, OnInit {

  title: string;
  message: string;

  task: Task = {
    taskId:    null,
    storyId: null,  //change this later to import Story and get storyId from there
    description : ''
  }

  _tasksArray: Task[];

  constructor(private taskService: TaskService, dialogService: DialogService, modalService: ModalService) {
    super(dialogService);

  }

  ngOnInit() {
    this.showCurrentTasks();

  }

  showCurrentTasks() {
    this.taskService.getTasks(localStorage.getItem('currentStoryId')).subscribe(
      res => {
        // console.log("Get tasks success!", res);
        //places reponse of task-manager-service/getAllTasks/{storyId} into task array
        this._tasksArray = res;
      }
    )
 }

//  have taskDescription marked as complete when clicked
 markComplete(taskDescription) {

 }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }



  //create/add a new task
  taskSubmit() {
    console.log("Creating new task: ", (this.task).description);
    this.task.storyId = JSON.parse(localStorage.getItem('currentStoryId'));
    console.log("New task storyId: ", (this.task.storyId));
    this.taskService.createTask(this.task).subscribe(
      res => {
          console.log("Create Task Success!", res);
        //immediately do a getTasks to refresh the list?
        this.showCurrentTasks();
      });
  }

}
