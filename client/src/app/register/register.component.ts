import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;

  constructor(private fb: FormBuilder, private _userService:UserService) { }

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
    this._userService.register(formData)
      .subscribe(error => console.log(error));
    // this.http.post(environment.apiUrl+'register',formData).subscribe(
    //   response => console.log(response),
    //   error => console.log(error)
    // );
  }
}
