import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-password-modal',
  templateUrl: './update-password-modal.component.html',
  styleUrls: ['./update-password-modal.component.css']
})
export class UpdatePasswordModalComponent implements OnInit {

  public form: FormGroup;
  public usuario = JSON.parse(localStorage.getItem('usuario'));

  constructor(
    public dialogRef: MatDialogRef<UpdatePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb: FormBuilder,
    private _userService:UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      conf_password: ['', [Validators.required, Validators.minLength(6)]]
     });
  }

  saveButton(idUser: any) {
    const formData = this.form.getRawValue();
    this._userService
      .updatePassword(idUser, formData)
        .subscribe(
          data => {
            this.refresh();
          }
        );
  }

  closeButton() {
    this.dialogRef.close(this.form.value);
  }

  refresh() {
    this.closeButton();
    window.location.reload();
  }
}
