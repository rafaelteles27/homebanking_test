
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomebankingComponent } from './homebanking/homebanking.component';

const routes: Routes = [ // Aqui define as rotas para cada pagina e tambem define o login como a mainpage
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, // Adicione esta linha
  { path: 'homebanking', component: HomebankingComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
