import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private fb:FormBuilder
  ) {
    console.log(this.modalData)
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
      precio: ['', [Validators.min(1),Validators.max(100)]],
      stock: ['', [Validators.min(1),Validators.max(100)]],
      imagen: '',
      categoria_id_categoria: '',
    });
  }

  saveButton() {
    console.log(this.form.value)
    this.closeButton();
  }

  closeButton() {
    this.dialogRef.close(this.form.value);
  }

}
