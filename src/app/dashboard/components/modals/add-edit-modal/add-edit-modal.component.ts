import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES = [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogModule ];

@Component({
  selector: 'add-edit-modal',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.scss'
})
export class AddEditModalComponent {

  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<AddEditModalComponent>);
  readonly name = model(this.data.superhero?.name || '');
  errorMessage = signal('');

  validData(){
    if(this.name() == ""){
      this.errorMessage.set("Field Required");
    } else {
      this.dialogRef.close(this.name());
    }
  }

}
