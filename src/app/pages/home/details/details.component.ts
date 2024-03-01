import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { UserLocationComponent } from '../../../components/user-location/user-location.component';
import { UserCommentListComponent } from '../../../components/user-comment/user-comment.component';

@Component({
  selector: 'details-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogClose,
    MatIconModule,
    CommonModule,
    UserLocationComponent,
    UserCommentListComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  constructor(public dialogRef: MatDialogRef<DetailsComponent>) {}

  close() {
    this.dialogRef?.close();
  }
}
