import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.css'],
})
export class UpdateProductModalComponent implements OnInit {

  public form: FormGroup;
  public categorias: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb: FormBuilder,
    private _productoService: ProductoService
  ) {}

  ngOnInit() {
    this.categorias = [
      'Nintendo Switch',
      'Playstation 5',
      'Xbox Series',
      'Playstation 4',
      'Xbox One',
      'Retro',
    ];
    this.form = this.fb.group({
      nombre_producto: '',
      descripcion: '',
      precio: ['', [Validators.min(1), Validators.max(1000)]],
      stock: ['', [Validators.min(1), Validators.max(100)]],
      imagen: '',
      categoria_id_categoria: '',
    });
  }

  // Función que actualiza la información del producto al pulsar el botón de "Guardar"
  // Recibe por parámetros el ID_PRODUCTO que se le pasa a la api para el UPDATE
  // Al completar la llamada a la API actualiza la página para refrescar los datos
  saveButton(idProducto: any) {
    const formData = this.form.getRawValue();
    this._productoService
      .updateProducto(idProducto, formData)
      .subscribe((data: any) => {
        console.log(data);
        $('.alert-success').fadeIn();
        setTimeout(
          this.refresh,
          5000
        );
      },
      (error: any) => {
        $('.alert-danger').fadeIn();
        console.log(error);
      });

  }

  // Función que cierra el modal de actualizar productos
  closeButton() {
    this.dialogRef.close(this.form.value);
  }

  // Función que refresca la página cuando se actualicen los datos
  refresh() {
    this.closeButton();
    window.location.reload();
  }
}
