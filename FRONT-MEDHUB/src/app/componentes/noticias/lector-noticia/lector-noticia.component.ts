import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from '../../../servicios/noticiaService/noticia.service';
import { Entrada } from '../../../modelos/entrada';
import { Usuario } from '../../../modelos/usuario';
import Swal from 'sweetalert2';
import { SwalMessagesService } from '../../../servicios/swalService/swal-messages.service';

//Componente que controla la logica del lector de noticias

@Component({
  selector: 'app-lector-noticia',
  templateUrl: './lector-noticia.component.html',
  styleUrl: './lector-noticia.component.css',
})
export class LectorNoticiaComponent implements OnInit {
  idNoticia: number = 0;
  isAutor: boolean = false;

  entrada: Entrada = {} as Entrada;

  constructor(
    private router: Router,
    private noticiaService: NoticiaService,
    private aRouter: ActivatedRoute,
    private swalMessageService: SwalMessagesService
  ) {}

  //Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    //Obtengo de la URL el valor del id para enviarlo al servicio y obtener la entrada de la noticia del back-end con dicho id
    this.idNoticia = this.aRouter.snapshot.params['id'];
    this.noticiaService
      .getNoticiaById(this.idNoticia)
      .subscribe((data: Entrada) => {
        this.entrada = data;
        console.log(this.entrada);
      });
    this.isAutor = this.userIsAutor();
  }

  // Verificar si el usuario es el autor de la entrada
  userIsAutor(): boolean {
    // Recuperar el usuario del localStorage
    const usuarioString = localStorage.getItem('usuario');

    // Verifico si hay un usuario almacenado
    if (usuarioString) {
      // Convierto el usuario de cadena a objeto Usuario
      const usuario: Usuario = JSON.parse(usuarioString);

      // Comparo el nombre de usuario del autor con el del creador de la noticia
      return this.entrada.autor.nombreUsuario === usuario.nombreUsuario;
    }

    return false; // Devuelve falso si no se encuentra el usuario en el almacenamiento local
  }

  //Borra la noticia de la base de datos
  borrarNoticia() {
    //Pido una confirmación mediante un swal.fire, que obliga al usuario a cerciorarse de que quiere realizar la acción
    Swal.fire({
      title: '¿Estás seguro de que quieres borrar la noticia?',
      text: 'Esta acción será irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la eliminación, llama al servicio para borrar la noticia
        console.log(this.idNoticia);
        this.noticiaService.deleteNoticia(this.idNoticia).subscribe(
          () => {
            // Despues de eliminar la noticia redirige al usuario al hub de noticias
            this.router.navigate(['/hub-noticias']);
            //Muestro un mensaje de que la noticia ha sido borrado con exito usando el swalMessageService
            this.swalMessageService.showSuccess(
              'La noticia ha sido borrada',
              'ÉXITO'
            );
          },
          (error) => {
            console.log(error);
            this.swalMessageService.showError(
              'Error al borrar la noticia, intentelo más tarde',
              'ERROR:'
            );
          }
        );
      }
    });
  }

  //Metodo que lee el texto del contenido y reemplaza los espacios (a partir de dos espacios en blanco seguidos) en blanco como un salto de linea <br>
  insertarSaltosLinea(contenido: String) {
    return contenido.replace(/ {2,}/g, '<br><br>');
  }
}
