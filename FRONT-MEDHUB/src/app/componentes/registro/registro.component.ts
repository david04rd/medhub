import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../servicios/registroService/registro.service';
import { Usuario } from '../../modelos/usuario';
import { Router } from '@angular/router';
import { SwalMessagesService } from '../../servicios/swalService/swal-messages.service';

//Clase encargada del registro de usuario

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuarioRegistrado: Usuario = {
    email: '',
    nombreUsuario: '',
    contrasenna: '',
    permisos: 'USUARIO',
    entradasAsociadas: [],
  };

  contrasennaConfirmacion: string = '';

  constructor(
    private swalMessages: SwalMessagesService,
    private servicioRegistro: RegistroService,
    private router: Router
  ) {}

  //Si se entra a esta ventana se elimina cualquier token y usuario almacenado en localstorage
  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

  }

  //Metodo que comprueba que todos los datos sean validos para registrar a un usuario
  registro() {

    //Compruebo si el usuario ya se encuentra registrado en la aplicacion
    this.servicioRegistro.usuarioIsRegistrado(this.usuarioRegistrado).subscribe({
      next: (usuarioRegistradoExistente) => {
        if (usuarioRegistradoExistente) {
          this.swalMessages.showWarning('El nombre de usuario introducido ya está registrado', 'ALERTA');
        } else {
          //Compruebo que el email no este en uso
          this.servicioRegistro.emailIsRegistrado(this.usuarioRegistrado).subscribe({
            next: (emailRegistrado) => {
              if (emailRegistrado) {
                this.swalMessages.showWarning('El email introducido ya está registrado', 'ALERTA');
              } else {
                //Compruebo que la contraseña y la confirmacion de la contraseña coincidan
                if (this.usuarioRegistrado.contrasenna !== this.contrasennaConfirmacion) {
                  this.swalMessages.showError('Las contraseñas no coinciden', 'ERROR');
                } else {
                  //Envio los datos del usuario al back-end y lo almaceno
                  this.servicioRegistro.registro(this.usuarioRegistrado).subscribe({
                    next: (res) => {
                      //Envio al usuario a la pantalla de login y muestro un mensaje de exito
                      this.router.navigate(['/login']);
                      this.swalMessages.showSuccess('Usuario registrado con éxito', 'FELICIDADES!');
                    },
                    error: (err) => {
                      this.swalMessages.showError('Error durante el registro', 'ERROR');
                      console.log(err);
                    },
                  });
                }
              }
            },
            error: (err) => {
              this.swalMessages.showError('Error al verificar el email', 'ERROR');
              console.log(err);
            }
          });
        }
      },
      error: (err) => {
        this.swalMessages.showWarning('El nombre de usuario introducido ya está registrado', 'ALERTA');
        console.log(err);
      }
    });
  }
}
