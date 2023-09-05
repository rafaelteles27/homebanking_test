// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,// Criar o formulário
    private authService: AuthService, // Serviço de autenticaçao
    private router: Router // Router de navegaçao
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() { // Se o formulário for válido, vai obter os dados do user
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      if (this.authService.loginUser(user)) {
        localStorage.setItem('currentUser', user.email); // armazena o email do user num local storage
        this.router.navigate(['/homebanking']); // caso o login seja bem sucedido, direciona para a pagina do homebanking
      } else {
        alert('Credenciais inválidas. Tente novamente.'); // um alerta caso o login nao esteja correto
      }
    }
  }
}
