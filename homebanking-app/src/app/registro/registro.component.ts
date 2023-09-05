// src/app/registro/registro.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegistrationModel } from '../models/registration.model';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const registroData: RegistrationModel = this.registroForm.value;
      const user: UserModel = { ...registroData, balance: 0 };
      this.authService.registerUser(user);
      this.router.navigate(['/login']);
    }
  }
}
