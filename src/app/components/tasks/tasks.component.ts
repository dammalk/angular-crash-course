import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { fade, noLeaveAnimation } from "./tasks.animations";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    fade,
    noLeaveAnimation
  ]
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  currentDate: string = '';
  showEditTask: boolean = false;
  showEditTaskId: number = 0;
  disableAnimations: boolean = true;
  
  constructor(private taskService: TaskService, private dateService: DateService) { }

  ngOnInit(): void {
    this.currentDate = this.dateService.getCurrentDateFormatted();

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = this.taskService.sortTasksByDate(tasks.filter(t => t.day >= this.currentDate));
    });    
  }

  

  showEdit(task: Task): void {
    if(this.showEditTask && this.showEditTaskId === task.id) {
      this.showEditTask = false;
    } else {
      this.showEditTask = true;
      this.showEditTaskId = task.id as number;
    }    
  }

  deleteTask(task: Task) {
    if(!confirm(`Are you sure you want to delete task "${task.text}"?`)) {
      return;
    }

    this.enableAnimations();

    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter(t => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();
  }

  addTask(task: Task) {
    this.enableAnimations();
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task)
      this.tasks = this.taskService.sortTasksByDate(this.tasks);
    });
    
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(() => (this.showEditTask = false));
  }

  enableAnimations(): void {
    if (this.disableAnimations === true) {
      this.disableAnimations = false;
    }
  }
}
