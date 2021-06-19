import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user:any = JSON.parse(localStorage.getItem('usuario'));

  constructor(private _userService: UserService) {
  }
  ngOnInit(): void {
  }

  logout(): void {
    this._userService.logout();
  }
}
