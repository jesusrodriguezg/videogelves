// Módulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RegisterComponent } from './register/register.component';
import { LoggedoutComponent } from './loggedout/loggedout.component';
import { Error404Component } from './error404/error404.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { FooterComponent } from './footer/footer.component';
import { AdminproductosComponent } from './adminproductos/adminproductos.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

// Servicios
import { ProductoService } from './services/productos.service';
import { UserService } from './services/user.service';
import { PathResolveService } from './services/path-resolve.service';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { ValoracionComponent } from './valoracion/valoracion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SecureComponent,
    DetalleComponent,
    RegisterComponent,
    LoggedoutComponent,
    Error404Component,
    CategoriaComponent,
    FooterComponent,
    AdminproductosComponent,
    ConfirmationDialogComponent,
    UpdateDialogComponent,
    ValoracionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [
    ProductoService,
    UserService,
    PathResolveService,
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
