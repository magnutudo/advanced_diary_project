import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../model/Category";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: [string, string]
  ) {
  }

  dialogTitle: string
  categoryTitle: string


  ngOnInit(): void {
    this.categoryTitle = this.data[0]
    this.dialogTitle = this.data[1]


  }

  onConfirm() {

    this.dialogRef.close(this.categoryTitle)


  }

  onCancel() {
    this.dialogRef.close(false)
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: "Подтвердите действие",
        message: `Вы действительно хотите удалить категорию : "${this.categoryTitle}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close('delete')

      }
    })

  }
}
