import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dialog: MatDialog,
    private dataService: DataHandlerService
  ) {
  }

  categories: Category[]
  priorities: Priority[]
  dialogTitle: string
  protected
  task: Task
  tmpTitle: string;
  tmpDate: Date
  tmpCategory: Category
  tmpPriority: Priority
  tmpCompleted: boolean

  ngOnInit(): void {
    this.dialogTitle = this.data[1];
    this.task = this.data[0]
    this.tmpTitle = this.task.title
    this.tmpDate = this.task.date
    this.tmpCompleted = this.task.completed
    this.tmpCategory = this.task.category
    this.tmpPriority = this.task.priority

    this.dataService.getAllCategories().subscribe(ctgrs => this.categories = ctgrs)
    this.dataService.getAllPriorities().subscribe(prts => this.priorities = prts)

  }

  onConfirm() {
    this.task.title = this.tmpTitle
    this.task.category = this.tmpCategory
    this.task.priority = this.tmpPriority
    this.task.date = this.tmpDate
    this.task.completed = this.tmpCompleted
    this.dialogRef.close(this.task)
  }

  onCancel() {
    this.dialogRef.close(null)
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: "Подтвердите действие",
        message: `Вы действительно хотите удалить задачу : "${this.task.title}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close("delete")
      }
    })
  }
}
