import { Component, OnInit } from '@angular/core';
import { Topico } from '../../../modelos/topico';
import { TopicoService } from '../../../servicios/topicoService/topico.service';
import Swal from 'sweetalert2';
import { SwalMessagesService } from '../../../servicios/swalService/swal-messages.service';
import { Usuario } from '../../../modelos/usuario';

@Component({
  selector: 'app-listado-topicos',
  templateUrl: './listado-topicos.component.html',
  styleUrls: ['./listado-topicos.component.css'],
})
export class ListadoTopicosComponent implements OnInit {
  topicos: Topico[] = [];
  topicosFiltrados: Topico[] = [];
  nombreBuscar: string = '';
  topicoSeleccionado: Topico | null = null;
  ultimoAutorActualizacion!:Usuario;

  constructor(private topicoService: TopicoService, private swalMessagesService:SwalMessagesService) {}

  ngOnInit(): void {
    this.cargarTopicos();
    this.obtenerultimoAutorActualizacionLocalStorage();
  }

  borrarTopico(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.topicoService.borrarTopico(id).subscribe(
          () => {
            this.cargarTopicos();
            this.swalMessagesService.showSuccess("TÓPICO BORRADO","ÉXITO");
          },
          (error) => {
            console.error('Error al borrar el tópico: ', error);
          }
        );
      }
    });
  }

  obtenerultimoAutorActualizacionLocalStorage(){
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      this.ultimoAutorActualizacion = JSON.parse(usuarioLocalStorage);
      
    } else {
      console.error('No se encontró el usuario en el LocalStorage');
    }
  }



  abrirModalEditar(topico: Topico): void {
    topico.ultimoAutorActualizacion=this.ultimoAutorActualizacion;
    this.topicoSeleccionado = { ...topico};
  }

  cerrarModalEditar(): void {
    this.topicoSeleccionado = null;
  }

  guardarCambios(): void {
    console.log(this.topicoSeleccionado);
    if (this.topicoSeleccionado) {
      this.topicoService.actualizarTopico(this.topicoSeleccionado).subscribe(
        () => {
          this.cargarTopicos();
          this.swalMessagesService.showSuccess("TÓPICO ACTUALIZADO", "ÉXITO");
          this.cerrarModalEditar(); 
        },
        (error) => {
          console.error('Error al actualizar el tópico: ', error);
        }
      );
    }
  }

  cargarTopicos() {
    this.topicoService.getTopicos().subscribe(
      (data: Topico[]) => {
        this.topicos = data;
      },
      (error) => {
        console.error('Error obteniendo tópicos: ', error);
      }
    );
  }
}
