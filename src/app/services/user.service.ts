import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User();

  constructor(private router: Router) { }

  login(username: string, password: string) {
    this.user = { id : 1, username: "usernames"}
    this.router.navigate(["/chat"]);
  }

  getUser(): User {
    return this.user;
  }
}
