export class Producto{
  public id_producto: any = "";
  public nombre_producto: any = "";
  public descripcion: any = "";
  public precio: any = "";
  public stock: any = "";
  public imagen: any = "";
  public categoria_id_categoria: any = "";

  constructor(){}

  public getIdProducto(){
    return this.id_producto;
  }
}
