// Módulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RegisterComponent } from './register/register.component';
import { LoggedoutComponent } from './loggedout/loggedout.component';
import { Error404Component } from './error404/error404.component';

// Servicios
import { ProductoService } from './services/productos.service';
import { UserService } from './services/user.service';
import { PathResolveService } from './services/path-resolve.service';
import { CategoriaComponent } from './categoria/categoria.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SecureComponent,
    ProductoComponent,
    DetalleComponent,
    RegisterComponent,
    LoggedoutComponent,
    Error404Component,
    CategoriaComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    ProductoService,
    UserService,
    PathResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
