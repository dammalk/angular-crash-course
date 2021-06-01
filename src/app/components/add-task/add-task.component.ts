import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { AngularMyDatePickerDirective } from 'angular-mydatepicker';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('datePicker') datePicker!: AngularMyDatePickerDirective;
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy.mm.dd'
  };
  selectedDate!: IMyDateModel;
  
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  reminder: boolean = false;

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
      day: !this.selectedDate ? '' : this.selectedDate.singleDate?.formatted as string,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);
    
    this.text = '';
    this.reminder = false;   
    this.datePicker.clearDate();
  }

  onDateChanged(event: IMyDateModel): void {
  }
}
