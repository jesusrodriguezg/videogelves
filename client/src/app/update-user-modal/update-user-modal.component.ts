import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css']
})
export class UpdateUserModalComponent implements OnInit {

  public form: FormGroup;
  public usuario = JSON.parse(localStorage.getItem('usuario'));

  constructor(
    public dialogRef: MatDialogRef<UpdateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb: FormBuilder,
    private _userService:UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.maxLength(25)],
      apellidos: ['', Validators.maxLength(50)],
      email: ['', [Validators.email,Validators.maxLength(50)]],
      direccion: ['', Validators.maxLength(200)]
    });
  }

  saveButton(idUser: any) {
    const formData = this.form.getRawValue();
    this._userService
      .updateUser(idUser, formData)
      .subscribe((data: any) => {
        $('.alert-success').fadeIn();
        setTimeout(
          this.refresh,
          5000
        );
      },
      (error: any) => {
        $('.alert-danger').fadeIn();
        console.log(error);
      });
  }

  // Función que cierra el modal de actualizar productos
  closeButton() {
    this.dialogRef.close(this.form.value);
  }

  // Función que refresca la página cuando se actualicen los datos
  refresh() {
    this.closeButton();
    window.location.reload();
  }

}
