// crear-noticia.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Topico } from '../../../modelos/topico';
import { Usuario } from '../../../modelos/usuario';
import { TopicoService } from '../../../servicios/topicoService/topico.service';
import { NoticiaService } from '../../../servicios/noticiaService/noticia.service';
import { Entrada } from '../../../modelos/entrada';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css'],
})
export class CrearNoticiaComponent implements OnInit {
  noticiaForm: any = {}; // Asegúrate de inicializar el formulario
  topicos: Topico[] = [];
  usuario: Usuario | null = null;
  idUsuario: number = 0;
  topicosSeleccionados: Topico[] = []; // Array para almacenar los tópicos seleccionados

  constructor(
    private topicoService: TopicoService,
    private noticiaService: NoticiaService,
    private router: Router
  ) {
    const usuarioString = localStorage.getItem('usuario');
    console.log(usuarioString);
    if (usuarioString) {
      // Parsear el JSON
      const usuarioObj = JSON.parse(usuarioString);

      // Crear una instancia de Usuario usando los datos del objeto JSON
      this.usuario = new Usuario(
        usuarioObj.nombreUsuario,
        usuarioObj.contrasenna,
        usuarioObj.email,
        usuarioObj.permisos,
        usuarioObj.entradasAsociadas
      );

      // Asignar el id del usuario si existe en el objeto JSON
      if ('id' in usuarioObj) {
        console.log('SI');
        this.idUsuario = usuarioObj.id;
        console.log(this.idUsuario);
      }
    } else {
      console.log('NO');
      return;
    }
  }

  ngOnInit(): void {
    this.topicoService.getTopicos().subscribe(
      (data: Topico[]) => {
        this.topicos = data;
      },
      (error) => {
        console.error('Error al obtener los tópicos:', error);
      }
    );
  }

  onTopicoChange(event: any, topico: Topico): void {
    if (event.target.checked) {
      //Lo añade a la lista si esta el checkbox marcado
      this.topicosSeleccionados.push(topico);
    } else {
      //Lo elimina de la lista si esta el checkbox desmarcado
      this.topicosSeleccionados = this.topicosSeleccionados.filter(
        (t) => t.id !== topico.id
      );
    }
  }

  // Construye el objeto entrada(noticia) y lo envia al back-end
  onSubmit(): void {
    if (this.camposRellenados()) {
      const fechaActual = new Date();
      const noticia = new Entrada(
        0,
        this.noticiaForm.nombreEntrada,
        this.noticiaForm.contenido,
        this.usuario!,
        fechaActual,
        fechaActual,
        this.usuario!,
        this.topicosSeleccionados,
        this.noticiaForm.portada
      );

      //Solicita una confirmacion para guardar la noticia
      Swal.fire({
        title: 'Confirmar',
        text: '¿Estás seguro de que deseas guardar esta noticia?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
      }).then((result: any) => {
        if (result.isConfirmed) {
          //Envia la noticia al back-end y una vez el servidor envia la respuesta se muestra un mensaje de exito si se ha guardado o uno de error en otro caso
          this.noticiaService.sendNoticia(noticia, this.idUsuario).subscribe(
            (response) => {
              console.log(response);
              Swal.fire('Guardado!', 'La noticia ha sido guardada.', 'success');
              this.router.navigate(['/hub-noticias']);
            },
            (error) => {
              console.error('Error al guardar la noticia:', error);
              Swal.fire(
                'Error',
                'Hubo un error al guardar la noticia.',
                'error'
              );
            }
          );
        }
      });
    }
  }

  //Comprueba que todos los campos necesarios para crear una noticia esten insertados
  camposRellenados(): boolean {
    return (
      this.noticiaForm.nombreEntrada &&
      this.noticiaForm.contenido &&
      this.topicosSeleccionados.length > 0
    );
  }

  //Cuando se presiona el boton de cancelar se muestra una alerta para verificar si el usuario quiere cancelar realmente
  //la creacion de esta noticia y si es asi se le envia al hub de noticias, borrando todos los cambios
  onCancel(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Realmente quieres cancelar la creación de la noticia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/hub-noticias']);
      }
    });
  }

  //Cambia el archivo que se enviara como blob al back-end
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.noticiaForm.portada = event.target.files[0];
    }
  }
}
