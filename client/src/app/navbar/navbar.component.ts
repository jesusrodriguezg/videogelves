import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public busqueda = "";

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
  }
  ngOnInit(): void {
  }

  search(search:any){
    console.log("search: "+search)
    this._router.navigate(['/search/',search]);
  }

  logout(): void {
    this._userService.logout();
  }
}
