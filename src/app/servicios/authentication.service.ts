import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {
    const logged = sessionStorage.getItem('loggedIn');
    this.loggedIn = logged === 'true' ? true : false; 
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn = status;
    sessionStorage.setItem('loggedIn', status ? 'true' : 'false');
  }
}

