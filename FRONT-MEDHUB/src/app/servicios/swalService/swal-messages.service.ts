import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

//Este servicio se usa para mostrar mensajes de cada tipo usando sweetalert2 en toda la aplicación. Son mensajes que duran 3 segundos y se muestran arriba a la derecha de la pantalla
//Hay 4 métodos diferentes por el tipo de icon a mostrar (sirve para indicar el tipo de mensaje)
@Injectable({
  providedIn: 'root',
})
export class SwalMessagesService {
  constructor() {}

  showSuccess(mensaje: string, titulo: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  }

  showError(mensaje: string, titulo: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  }

  showWarning(mensaje: string, titulo: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  }

  showInfo(mensaje: string, titulo: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'info',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  }
}
