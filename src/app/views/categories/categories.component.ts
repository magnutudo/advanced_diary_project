import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[]
  selectedCategory: Category;

  constructor(private dataService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataService.getAllCategories().subscribe(categories => this.categories = categories)
  }

  showTasksCategory(category: Category) {
    this.selectedCategory = category

  }
}
