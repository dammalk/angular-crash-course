import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  showEditTask: boolean = false;
  showEditTaskId: number = 0;
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
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
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)));
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(() => (this.showEditTask = false));
  }
}
