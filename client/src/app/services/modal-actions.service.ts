import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

  constructor() { }

  modalAction(modalData: any){
    switch (modalData.name) {
      case "editProducto":

        break;

      default:
        break;
    }
  }
}
