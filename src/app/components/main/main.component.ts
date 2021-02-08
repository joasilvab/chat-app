import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isAuthenticated: Boolean;
  username: string = "";

  constructor(private authService: AuthService) { 
    this.isAuthenticated = authService.isLoggedIn();
    this.username = authService.getClaims()?.username;
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.startAuthentication();
  }
}
