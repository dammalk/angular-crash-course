import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  faPen = faPen;

  showIcons: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(task: Task) {
    this.onEditTask.emit(task);
  }

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }
  
  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }

  onMouseEnter(): void {
    this.showIcons = true;
  }

  onMouseLeave(): void {
    this.showIcons = false;
  }
}
