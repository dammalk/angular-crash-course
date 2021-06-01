import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy.mm.dd'
  };
  
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder: boolean = false;
  selectedDate!: IMyDateModel;

  showAddTask!: boolean;
  subscription!: Subscription;
  
  constructor(private uiService: UiService) { 
    this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text){
      alert('Please add a task!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);
    
    this.text = '';
    this.day = '';
    this.reminder = false;   

  }

  onDateChanged(event: IMyDateModel): void {
    this.selectedDate = event;
    this.day = this.selectedDate.singleDate?.formatted as string;
  }
}
