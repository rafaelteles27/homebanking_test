import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Adicione o FormsModule aqui
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomebankingComponent } from './homebanking/homebanking.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent} from './registro/registro.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovementsListComponent } from './movements-list/movements-list.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomebankingComponent,
    LoginComponent,
    RegistroComponent,
    MovementsListComponent,
    
    // ...outros componentes
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Adicione o FormsModule aqui
    ReactiveFormsModule, 
    BrowserAnimationsModule, // Se você planeja usar ReactiveFormsModule

    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

