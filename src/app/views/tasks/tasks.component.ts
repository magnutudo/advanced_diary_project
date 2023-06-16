import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public dataSource: MatTableDataSource<Task>;


  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  constructor(private dataHandler: DataHandlerService, public dialog: MatDialog) {
  }

  @Output() selectedTask = new EventEmitter<Task>()
  tasks: Task[];

  @Input("tasks")
  set setTasks(tasks: Task[]) {
    this.tasks = tasks
    this.fillTable()
  }

  ngOnInit() {
    /*  this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks)*/


    this.dataSource = new MatTableDataSource();

    this.fillTable();
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


  fillTable() {

    if (!this.dataSource) {
      return
    }
    this.dataSource.data = this.tasks;
    this.addTableObjects();


//@ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case "priority": {
          return task.priority ? task.priority.id : null
        }
        case "category": {
          return task.category ? task.category.title : null
        }
        case "date": {
          return task.date ? task.date : null
        }
        case "title" : {
          return task.title
        }
      }
    }


  }

  addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }


  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent,

      {
        height: '400px',
        width:'600px',
        data: [task, "Редактирование задачи"],
        autoFocus: false
      })
    dialogRef.afterClosed().subscribe(res => {
      if (res as Task) {
        this.selectedTask.emit(task)
        return
      }
    })
  }
}
