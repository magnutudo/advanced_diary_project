import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: Category[]
  selectedCategory: Category;

  constructor(private dataService: DataHandlerService) {
  }

  ngOnInit(): void {

  }

  showTasksCategory(category: Category) {
    this.selectedCategory = category

  }
}
