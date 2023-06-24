import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() deleteCategory = new EventEmitter<Category>()

  @Input() categories: Category[];

  @Output() updateCategory = new EventEmitter<Category>();

  indexMouseMove: number

  @Output() selectCategory = new EventEmitter<Category>();

  @Input() selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
  }


  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }


  showTasksByCategory(category: Category): void {


    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category
    this.selectCategory.emit(this.selectedCategory);
  }

  protected readonly indexedDB = indexedDB;

  showIcon(indx: number) {
    this.indexMouseMove = indx
    console.log(this.indexMouseMove)

  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: "500px",
      height: "300px",
      data: [category.title, "Редактирование категории"],
      autoFocus: false
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res === "delete") {
        this.deleteCategory.emit(category)
        return

      }
      if (typeof (res) === "string") {
        category.title = res as string
        this.updateCategory.emit(category)
        return;
      }

    })
  }
}
