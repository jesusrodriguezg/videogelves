import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Login | VideoGelves";
  form:FormGroup;
  status:number;
  user:any;

  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private _userService:UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'Ag0ldyjPv4bq2MQH9cXJpiNcvZNKKdASV4pY01H1',
      scope: '*'
    };

    this.http.post('http://localhost:8000/oauth/token', data).subscribe(
      (result: any) => {
        console.log(result);
        // localStorage.setItem('token', result.access_token);
        console.log("éxito")
        this._userService.login(result.access_token);
        this.router.navigate(['/secure']);
      },
      error => {
        console.log('error');
        console.log(error);
      }
    );
  }

}
