import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelos/usuario';
import { EntradaBiblioteca } from '../../../modelos/entradaBiblioteca';
import { EntradaBibliotecaService } from '../../../servicios/entradaBibliotecaService/entrada-biblioteca.service';

@Component({
  selector: 'app-crear-entrada-biblioteca',
  templateUrl: './crear-entrada-biblioteca.component.html',
  styleUrls: ['./crear-entrada-biblioteca.component.css'],
})
export class CrearEntradaBibliotecaComponent implements OnInit {
  entradaForm: EntradaBiblioteca = {
    id: 0,
    nombreEntrada: '',
    contenido: '',
    autor: null!,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
    ultimoAutorActualizacion: null!,
    portada: null!,
    tipoEntradaBiblioteca: '',
  };

  usuario: Usuario | null = null;
  idUsuario: number = 0;

  constructor(
    private entradaBibliotecaService: EntradaBibliotecaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.camposRellenados()) {
      const tipoEntrada = this.route.snapshot.paramMap.get('tipoEntrada');
      if (!tipoEntrada) {
        // Manejar el caso en que el parámetro no esté presente
        console.error('Error: El parámetro tipoEntrada no está presente en la URL');
        return;
      }
      // Asignar el tipo de entrada a la propiedad tipoEntradaBiblioteca
      this.entradaForm.tipoEntradaBiblioteca = tipoEntrada;
  
      // Mostrar SweetAlert para confirmar antes de enviar la entrada al backend
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres guardar esta entrada para tratamientos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Envía la entrada al backend
          this.entradaBibliotecaService
            .sendEntradaBiblioteca(this.entradaForm, this.idUsuario)
            .subscribe(
              (response: any) => {
                console.log(response);
                Swal.fire('Guardado!', 'La entrada ha sido guardada.', 'success');
                this.router.navigate(['']);
              },
              (error: any) => {
                console.error('Error al guardar la entrada:', error);
                Swal.fire('Error', 'Hubo un error al guardar la entrada.', 'error');
              }
            );
        }
      });
    }
  }

  //Comprueba que todos los campos necesarios para crear una noticia esten insertados
  camposRellenados(): boolean {
    // Verifica que los campos necesarios estén completos
    return !!this.entradaForm.nombreEntrada && !!this.entradaForm.contenido;
  }

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
        this.router.navigate(['']);
      }
    });
  }

  onFileChange(event: any): void {
    // Método para manejar el cambio de archivo en el campo de portada
    if (event.target.files.length > 0) {
      this.entradaForm.portada = event.target.files[0];
    }
  }
}
