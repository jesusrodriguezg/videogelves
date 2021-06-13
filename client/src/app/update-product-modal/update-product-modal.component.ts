import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.css']
})
export class UpdateProductModalComponent implements OnInit {

  public form:FormGroup;
  public categorias:Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb:FormBuilder,
    private _productoService:ProductoService
  ) {
  }

  ngOnInit() {
    this.categorias = [
      'Nintendo Switch',
      'Playstation 5',
      'Xbox Series',
      'Playstation 4',
      'Xbox One',
      'Retro'
    ];
    this.form = this.fb.group({
      nombre_producto: '',
      descripcion: '',
      precio: ['', [Validators.min(1),Validators.max(1000)]],
      stock: ['', [Validators.min(1),Validators.max(100)]],
      imagen: '',
      categoria_id_categoria: '',
    });
    console.log(this.modalData.idProducto)
  }

  saveButton(idProducto:any) {
    const formData = this.form.getRawValue();
    this._productoService.updateProducto(idProducto,formData)
      .subscribe( data =>
        console.log(data)
      );
    this.closeButton();
    this.refresh();
  }

  closeButton() {
    this.dialogRef.close(this.form.value);
  }

  refresh(){
    window.location.reload();
  }
}
