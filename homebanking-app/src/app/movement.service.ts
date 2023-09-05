import { Injectable } from '@angular/core';
import { MovementModel } from './models/movement.model';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private movements: MovementModel[] = [];


  // Este método adiciona uma nova ordem de transferencia para um user, se resultar
  addMovement(user: UserModel, movement: MovementModel) {
    movement.user = user;
    this.movements.push(movement);
    console.log("Verificar se o historico de transaçoes funciona")
  }

  // Este método serve para os movimentos serem para um user especifico
  getMovementsByUser(user: UserModel): MovementModel[] {
    // Filtra os movimentos pelo usuário
    return this.movements.filter((movement) => movement.user === user);
  }

  
  getMovements() {
    return this.movements;
  }
}
