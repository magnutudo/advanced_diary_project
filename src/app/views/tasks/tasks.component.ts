import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public dataSource: MatTableDataSource<Task>;


  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);


    this.dataSource = new MatTableDataSource();

    this.refreshTable();
  }


  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }


  getPriorityColor(task: Task) {

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }


  private refreshTable() {

    this.dataSource.data = this.tasks;


  }
}
