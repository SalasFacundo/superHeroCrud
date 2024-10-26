import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

const MATERIAL_MODULES = [MatButtonModule, MatDialogContent, MatDialogActions];

@Component({
  selector: 'modal-confirmation',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {

  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);

  superhero = input.required<string>();

}
