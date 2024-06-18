import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: User | null = null;

  constructor() {
    const logged = sessionStorage.getItem('loggedIn');
    this.loggedIn = logged === 'true' ? true : false;

    const userString = sessionStorage.getItem('currentUser');
    this.currentUser = userString ? JSON.parse(userString) : null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(status: boolean, user: User | null = null): void {
    this.loggedIn = status;
    this.currentUser = user;
    sessionStorage.setItem('loggedIn', status ? 'true' : 'false');
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
