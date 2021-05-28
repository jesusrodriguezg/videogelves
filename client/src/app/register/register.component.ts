import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;

  constructor(private fb: FormBuilder, private http:HttpClient) { }

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

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.http.post('http://localhost:8000/api/register',formData).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
