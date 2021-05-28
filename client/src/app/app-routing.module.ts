import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleComponent } from './detalle/detalle.component';
import { LoggedoutComponent } from './loggedout/loggedout.component';
import { RegisterComponent } from './register/register.component';
import { Error404Component } from './error404/error404.component';
import { PathResolveService } from './services/path-resolve.service';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: SecureComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'loggedout', component: LoggedoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':nombreProducto', component: DetalleComponent },
  { path: 'categoria/:nombreCategoria', component: CategoriaComponent },
  { path: '', component: HomeComponent },
  {
    path: '404',
    resolve: {
      path: PathResolveService
    },
    component: Error404Component
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
