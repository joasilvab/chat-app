import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = "";

  constructor(private router: Router) { }

  login(username: string, password: string) {
    this.username = username;
    this.router.navigate(["/chat"]);
  }

  getUsername(): string {
    return this.username;
  }
}
