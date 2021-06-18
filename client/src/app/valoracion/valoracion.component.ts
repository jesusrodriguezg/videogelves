import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ValoracionService } from '../services/valoracion.service';
import { Valoracion } from './valoracion';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css'],
  providers: [NgbRatingConfig]
})
export class ValoracionComponent implements OnInit {

  @Input() id_prod:any;
  public valoraciones: Array<Valoracion> = [];
  public valoracion = new Valoracion();
  public form:FormGroup;
  public user: any = JSON.parse(localStorage.getItem("usuario"));
  public hasCommented:any;

  constructor(
    private _valoracionService: ValoracionService,
    private config: NgbRatingConfig,
    private fb:FormBuilder,
    private _router:Router
  ) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit(): void {
    this.getValoraciones(this.id_prod);
    this.form = this.fb.group({
      comentario: ['', [Validators.required, Validators.maxLength(300)]],
      puntuacion: ['', [Validators.required]],
    });
  }

  getValoraciones(idProducto:any){
    this._valoracionService.getValoraciones(idProducto)
      .subscribe(data => {
        for(const d of data){
          this.valoracion = new Valoracion();
          this.valoracion.comentario = d.comentario;
          this.valoracion.puntuacion = d.puntuacion;
          this.valoracion.id_producto = d.id_producto;
          this.valoracion.id_usuario = d.id_usuario;
          this.valoracion.nombre = d.nombre;
          this.valoraciones.push(this.valoracion);
        }
        this.getHasCommented(this.user.id_user,this.id_prod);
      });
    }

    onSubmit(){
      const formData = this.form.getRawValue();
      console.log(this.user.id_user)
      this._valoracionService.addValoracion(this.user.id_user,this.id_prod,formData)
        .subscribe(data => {
          console.log(data)
          window.location.reload();
        });
    }

    toLogin(){
      this._router.navigate(['/login']);
    }

    getHasCommented(idUsuario:any,idProducto:any){
      return this._valoracionService.searchValoracion(idUsuario,idProducto)
        .subscribe(data => {
          this.hasCommented = data;
        });
    }
}
