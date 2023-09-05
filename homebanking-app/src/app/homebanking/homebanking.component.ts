import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserModel } from '../models/user.model';
import { MovementService } from '../movement.service';
import { MovementModel } from '../models/movement.model';

import { trigger,state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-homebanking',
  templateUrl: './homebanking.component.html',
  styleUrls: ['./homebanking.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 }))),
    ]),
  ],
})
export class HomebankingComponent implements OnInit {
  movements: MovementModel[] = []; // Array para armazenar os movimentos
  user: UserModel | undefined; // O usuário atualmente logado
  userBalance: number | undefined; // Saldo do user

  constructor(private authService: AuthService, private movementService: MovementService) {
    const userEmail = localStorage.getItem('currentUser');
    if (userEmail) {
      // Recupera o user atualmente logado do armazenamento local
      this.user = authService.getUserByEmail(userEmail);
    }
    // Obtém todos os movimentos disponíveis
    this.movements = movementService.getMovements();
    // Inicializa o saldo do usuário como 0
    this.userBalance = 0;
  }

  ngOnInit() {
    const userEmail = localStorage.getItem('currentUser');
    if (userEmail) {
      this.user = this.authService.getUserByEmail(userEmail);
      this.userBalance = this.authService.getUserBalance(userEmail);
      
      if (this.user) {
        this.movements = this.movementService.getMovementsByUser(this.user);
      }
    }
  }

  formatCurrency(value: number): string {
    // Formata o valor como moeda com o símbolo EUR
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR', 
    }).format(value);
  }
  

  deposit() {
    const amountStr = prompt('Digite o valor do depósito:');
    if (!amountStr) {
      // O user cancelou a operação ou inseriu um valor vazio
      return;
    }
  
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      // Valor inválido
      alert('Por favor, insira um valor válido maior que zero.');
      return;
    }
  
    if (this.user) {
      const movement: MovementModel = {
        date: new Date(),
        type: 'deposit',
        amount: amount,
        description: 'Depósito',
        user: this.user,
      };
  
      this.movementService.addMovement(this.user, movement); // Adiciona o movimento ao serviço de movimento
      this.authService.updateUserBalance(this.user.email, amount); // Atualiza o saldo do user

      this.movements = this.movementService.getMovementsByUser(this.user); // isto serve para atualizes a lista de movimentos
  
      // Atualizar o saldo
      if (this.userBalance !== undefined) {
        this.userBalance += amount;
      } else {
        this.userBalance = amount;
      }
    }
  }
  
  

  withdraw() {
    const amountStr = prompt('Digite o valor da retirada:');
    if (!amountStr) {
      // O user cancelou a operação ou inseriu um valor vazio
      return;
    }
  
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      // Valor inválido
      alert('Por favor, insira um valor válido maior que zero.');
      return;
    }
  
    if (this.user) {
      if (this.userBalance !== undefined) {
        if (amount <= this.userBalance) {
          const movement: MovementModel = {
            date: new Date(),
            type: 'withdrawal',
            amount: amount,
            description: 'Retirada',
            user: this.user,
          };
  
          this.movementService.addMovement(this.user, movement);
          this.authService.updateUserBalance(this.user.email, -amount);
          this.userBalance -= amount; 

          this.movements = this.movementService.getMovementsByUser(this.user);
  
        } else {
          alert('Saldo insuficiente para esta retirada.');
        }
      } else {
        alert('O saldo do usuário não está definido. Recarregue a página.');
      }
    }
  }
}
  
