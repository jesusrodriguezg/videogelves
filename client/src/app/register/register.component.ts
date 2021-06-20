import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService:UserService,
    private http:HttpClient,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      conf_password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.maxLength(25)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  onSubmit() {
    const formData = this.form.getRawValue();
    // this._userService.register(formData)
    //   .subscribe(error => console.log(error));
    this.http.post(environment.apiUrl+'user/register',formData).subscribe(
      response => {
        console.log(response)
        $('.alert-success').fadeIn();
        setTimeout(() => $('alert-success').fadeOut(),4000);
      },
      error => {
        console.log('error');
        console.log(error);
        $('.alert-danger').fadeIn();
        setTimeout(() => $('alert-danger').fadeOut(),4000);
      }
    );
  }
}
