// src/app/secure/secure.component.ts
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  user: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    console.log(localStorage.getItem('token'));
    this.http.get('http://localhost:8000/api/user', {headers}).subscribe(
      result => {
        this.user = result,
        localStorage.setItem('usuario', JSON.stringify(this.user))
      },
      error => {
        this.userService.logout();
        this.router.navigate(['/login']);
      }
    );
  }
}
