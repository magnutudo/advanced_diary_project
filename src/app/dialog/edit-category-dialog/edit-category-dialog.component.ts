import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string]
  ) {
  }

  dialogTitle: string
  category: Category
  Tmpcategory: string


  ngOnInit(): void {
    this.dialogTitle = this.data[1]
    this.category = this.data[0]
    this.Tmpcategory = this.category.title

  }

  onConfirm() {
    this.category.title = this.Tmpcategory
    this.dialogRef.close(this.category)

  }

  onCancel() {
    this.dialogRef.close()
  }
}
