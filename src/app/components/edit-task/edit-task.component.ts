import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { AngularMyDatePickerDirective } from 'angular-mydatepicker';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @ViewChild('datePicker') datePicker!: AngularMyDatePickerDirective;
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy.mm.dd'
  };
  selectedDate!: IMyDateModel;
  
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Input() task!: Task;
  text!: string;
  reminder: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    this.text = this.task.text;
    this.reminder = this.task.reminder;
    // TO DO: bind date
  }

  onSubmit() {
    
  }

  onDateChanged(event: IMyDateModel): void {
  }

}
