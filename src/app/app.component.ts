import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[]
  categories: Category[]
  selectedCategory: Category

  constructor(private dataService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataService.getAllTasks().subscribe(tasks => this.tasks = tasks)
    this.dataService.getAllCategories().subscribe(categories => this.categories = categories)
  }

  onSelect(category: Category) {
    this.selectedCategory = category
    this.dataService.searchTasks(category, null, null, null).subscribe(tasks => this.tasks = tasks)

  }

  onTasks(task: Task) {
    this.dataService.updateTask(task).pipe(
      switchMap(() => this.dataService.searchTasks(
        this.selectedCategory, null, null, null
      ))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onDeleteTask(task: Task) {
    this.dataService.deleteTask(task.id).subscribe(() => {
      this.dataService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks
      })
    })

  }
}
