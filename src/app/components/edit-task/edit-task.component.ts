import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateService } from '../../services/date.service';
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
  
  @Output() onSaveEditTask: EventEmitter<Task> = new EventEmitter();
  @Input() task!: Task;
  text!: string;
  reminder: boolean = false;
  
  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.text = this.task.text;
    this.reminder = this.task.reminder;
    this.selectedDate = this.dateService.convertFromStringToIMyDateModel(this.task.day);
  }

  onSubmit() {
    if (!this.text){
      alert('Task name can\'t be empty!');
      return;
    }
    if (!this.selectedDate){
      alert('Please select a date!');
      return;
    }

    this.task.text = this.text;
    this.task.reminder = this.reminder;
    this.task.day = !this.selectedDate ? '' : this.selectedDate.singleDate?.formatted as string;

    this.onSaveEditTask.emit(this.task);
  }

  onDateChanged(event: IMyDateModel): void {
  }

}
