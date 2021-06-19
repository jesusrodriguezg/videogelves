import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VideoGelves';

  loggedIn;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.isUserLoggedIn().subscribe(
      status => this.loggedIn = status
    );
    console.log('isLogged', this.loggedIn);
  }

  logout(): void {
    this.userService.logout();
  }
}
