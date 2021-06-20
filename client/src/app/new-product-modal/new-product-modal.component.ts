import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.css']
})
export class NewProductModalComponent implements OnInit {

  public form:FormGroup;
  public categorias:Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<NewProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private fb:FormBuilder,
    private _productoService: ProductoService
  ) { }

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
      nombre_producto: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precio: ['', [Validators.required, Validators.min(1),Validators.max(1000)]],
      stock: ['', [Validators.required, Validators.min(1),Validators.max(100)]],
      imagen: ['', Validators.required],
      categoria_id_categoria: ['', Validators.required],
    });
  }

  saveButton() {
    const formData = this.form.getRawValue();
    this._productoService.createProducto(formData).subscribe(
      data => { this.refresh(); }
    );
    this.closeButton();
  }

  closeButton() {
    this.dialogRef.close(this.form.value);
  }

  refresh(){
    this.closeButton();
    window.location.reload();
  }
}
