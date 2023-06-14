import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[]
  categories: Category[]

  constructor(private dataService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataService.getAllTasks().subscribe(tasks => this.tasks = tasks)
    this.dataService.getAllCategories().subscribe(categories => this.categories = categories)
  }
}
