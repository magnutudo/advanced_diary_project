import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Output()
  deleteTask = new EventEmitter<Task>();
   dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  updateTask = new EventEmitter<Task>();

   displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];


   tasks: Task[];


  @Input('tasks')
   set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,

  ) {
  }

  ngOnInit() {


    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }




   getPriorityColor(task: Task): string {

    // цвет завершенной задачи
    if (task.completed) {
      return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

  }


   fillTable(): void {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();


    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }

        case 'title': {
          return task.title;
        }
      }
    };


  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

   openEditTaskDialog(task: Task): void {

    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
      }


      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }

    });
  }



   openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

   onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }


   onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }

}
