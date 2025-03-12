import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradaBiblioteca } from '../../../modelos/entradaBiblioteca';
import { Usuario } from '../../../modelos/usuario';
import { EntradaBibliotecaService } from '../../../servicios/entradaBibliotecaService/entrada-biblioteca.service';
import Swal from 'sweetalert2';
import { SwalMessagesService } from '../../../servicios/swalService/swal-messages.service';

@Component({
  selector: 'app-lector-entrada-biblioteca',
  templateUrl: './lector-entrada-biblioteca.component.html',
  styleUrls: ['./lector-entrada-biblioteca.component.css']
})
export class LectorEntradaBibliotecaComponent implements OnInit {
  idEntrada: number = 0;
  isAutor: boolean = false;
  entrada: EntradaBiblioteca = {} as EntradaBiblioteca;

  constructor(
    private router: Router,
    private entradaBibliotecaService: EntradaBibliotecaService,
    private activatedRoute: ActivatedRoute,
    private swalMessageService: SwalMessagesService
  ) { }

  ngOnInit(): void {
    this.idEntrada = this.activatedRoute.snapshot.params['id'];
    this.entradaBibliotecaService.getEntradaBibliotecaById(this.idEntrada)
      .subscribe((data: EntradaBiblioteca) => {
        this.entrada = data;
        this.isAutor = this.userIsAutor();
      });
  }

  userIsAutor(): boolean {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario: Usuario = JSON.parse(usuarioString);
      return this.entrada.autor.nombreUsuario === usuario.nombreUsuario;
    }
    return false;
  }

  borrarEntrada() {
    Swal.fire({
      title: '¿Estás seguro de que quieres borrar la entrada de la biblioteca?',
      text: 'Esta acción será irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.entradaBibliotecaService.deleteEntradaBiblioteca(this.idEntrada)
          .subscribe(() => {
            this.router.navigate(['biblioteca/materialAcademico']);
            this.swalMessageService.showSuccess(
              'La entrada de la biblioteca ha sido borrada',
              'ÉXITO'
            );
          },
          (error) => {
            console.log(error);
            this.swalMessageService.showError(
              'Error al borrar la entrada de la biblioteca, intentelo más tarde',
              'ERROR:'
            );
          }
        );
      }
    });
  }

  insertarSaltosLinea(contenido: string) {
    return contenido.replace(/ {2,}/g, '<br><br>');
  }
}
