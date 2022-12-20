import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/views/views.component';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent {
  element!: PeriodicElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
     public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
   ) {}

    ngOnInit(): void {
      if (this.data.position != null)
      this.isChange = true;
    } 
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
