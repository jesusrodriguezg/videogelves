import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn:boolean;

  constructor(private _userService: UserService) {
  }
  ngOnInit(): void {
    this.isUserLogged();
  }

  isUserLogged(){
    this.loggedIn = this._userService.isUserLoggedIn();
    console.log('isLogged', this.loggedIn);
  }

  logout(): void {
    this._userService.logout();
  }
}
