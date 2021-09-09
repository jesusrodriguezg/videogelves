import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { UpdateUserModalComponent } from '../update-user-modal/update-user-modal.component';
import { User } from './user';

@Component({
  selector: 'app-adminusuarios',
  templateUrl: './adminusuarios.component.html',
  styleUrls: ['./adminusuarios.component.css']
})
export class AdminusuariosComponent implements OnInit, OnDestroy {

  public users: Array<User> = [];
  public user = new User();
  public nombre_categoria:string;
  public message = "";
  public dtOptions: DataTables.Settings = {};
  //El trigger se usa para que los datos se carguen antes de renderizar
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _userService:UserService,
    private _router: Router,
    private matDialog: MatDialog
  ) {
    if (!_userService.isUserLogged()) {
      _router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "url": "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
      },
      responsive: true,
      destroy: true
    };
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editUserModal(id_user:any) {
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
      id_user: id_user
    }
    const modalDialog = this.matDialog.open(UpdateUserModalComponent, dialogConfig);
  }

  getAllUsers(){
    this._userService.getAllUsers().subscribe(data => {
      for (const d of data) {
        this.user = new User();
        this.user.id_user = d.id_user;
        this.user.email = d.email;
        this.user.nombre = d.nombre;
        this.user.apellidos = d.apellidos;
        this.user.direccion = d.direccion;
        this.user.admin = d.admin;
        this.users.push(this.user);
      }
      this.dtTrigger.next();
    });
  }

  volverAdmin(){
    this._router.navigate(['/secure/']);
  }
}
