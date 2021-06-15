// src/app/secure/secure.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateUserModalComponent } from '../update-user-modal/update-user-modal.component';
import { UpdatePasswordModalComponent } from '../update-password-modal/update-password-modal.component';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  user: any;

  constructor(
      private http: HttpClient,
      private _userService: UserService,
      private _router: Router,
      private matDialog: MatDialog
    ) {
      if (!_userService.isUserLogged()) {
        _router.navigate(['/login']);
      }
    }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    this.http.get(environment.apiUrl+'user', {headers}).subscribe(
      result => {
        this.user = result,
        localStorage.setItem('usuario', JSON.stringify(this.user));
      },
      error => {
        this._userService.logout();
        this._router.navigate(['/login']);
      }
    );
  }

  editUserModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      name: "editProducto",
      title: "Editor de datos de usuario",
      description: "Rellena los campos que quieras modificar; deja vacíos los que no.",
      actionButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }
    const modalDialog = this.matDialog.open(UpdateUserModalComponent, dialogConfig);
  }

  editPasswordModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      name: "editProducto",
      title: "Editor de contraseña",
      description: "Rellena los dos campos con la misma contraseña.",
      actionButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }
    const modalDialog = this.matDialog.open(UpdatePasswordModalComponent, dialogConfig);
  }
}
