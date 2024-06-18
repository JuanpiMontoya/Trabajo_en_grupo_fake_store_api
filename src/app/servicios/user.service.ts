import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiurl = 'http://localhost:3000/users';

  constructor() { }

  async getUsers(): Promise<User[]> {

    const resp = await fetch(this.apiurl);
    if (!resp.ok) {
      throw new Error('Failed to fetch users');
    }
    return await resp.json();

  }

  async getUserById(id: number): Promise<User> {

    const resp = await fetch(`${this.apiurl}/${id}`);
    if (!resp.ok) {
      throw new Error('User not found');
    }
    return await resp.json();

  }

  async createUser(user: User): Promise<any> {

    const resp = await fetch(`${this.apiurl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!resp.ok) {
      throw new Error('Failed to create user');
    }
    return await resp.json();

  }

  async updateUser(id: number, user: User): Promise<User> {

    const resp = await fetch(`${this.apiurl}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!resp.ok) {
      throw new Error('Failed to update user');
    }
    return await resp.json();

  }

  async deleteUser(id: number): Promise<any> {

    const resp = await fetch(`${this.apiurl}/delete/${id}`, {
      method: 'DELETE'
    });
    if (!resp.ok) {
      throw new Error('Failed to delete user');
    }
    return await resp.json();

  }
}