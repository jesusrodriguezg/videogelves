import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  message:any;
  form:FormGroup;
  constructor(
    private _confirmationDialogService: ConfirmationDialogService,
    private fb: FormBuilder,
    private http:HttpClient
  ) { }

  ngOnInit(): any {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      categoria: ['', [Validators.required]]
    });
    this._confirmationDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  onSubmit():void{
    const formData = this.form.getRawValue();
    this.http.put(environment.apiUrl+'productos/update',formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

}
