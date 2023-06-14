import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public dataSource: MatTableDataSource<Task>;


  tasks: Task[];
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngAfterViewInit(): void {
    this.addTableObjects()
  }

  ngOnInit() {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks)


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


  refreshTable() {


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
}
