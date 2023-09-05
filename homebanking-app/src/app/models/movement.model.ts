import { UserModel } from "./user.model";

export interface MovementModel {
    user: UserModel;
    date: Date;
    type: 'deposit' | 'withdrawal';
    amount: number;
    description: string;
  }
  