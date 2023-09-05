// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: UserModel[] = []; // Array para armazenar os users

  constructor() {}

  // Este método regista um user
  registerUser(user: UserModel) {
    user.balance = 0; // aqui define o saldo inicial, 0
    this.users.push(user); // aqui adiciona um user ao array
  }

  // Este método serve para fazer o login do user
  loginUser(user: UserModel): boolean {
    const foundUser = this.users.find(
      (u) => u.email === user.email && u.password === user.password
    );
    return !!foundUser;
  }

  getUserByEmail(email: string): UserModel | undefined {
    return this.users.find((user) => user.email === email);
  }

  // Método para atualizar o saldo do user
  updateUserBalance(email: string, amount: number) {
    const user = this.getUserByEmail(email);
    if (user) {
      user.balance += amount;
    }
  }

  getUserBalance(email: string): number | undefined {
    const user = this.getUserByEmail(email);
    return user ? user.balance : undefined;
  }

  
}
