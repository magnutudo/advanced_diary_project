import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/Task";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dialog: MatDialog
  ) {
  }

  dialogTitle: string
  protected task: Task
  tmpTitle: string;

  ngOnInit(): void {
    this.dialogTitle = this.data[1];
    this.task = this.data[0]
    this.tmpTitle = this.task.title

  }

  onConfirm() {
    this.task.title = this.tmpTitle
    this.dialogRef.close(this.task)

  }

  onCancel() {
    this.dialogRef.close(null)
  }
}
