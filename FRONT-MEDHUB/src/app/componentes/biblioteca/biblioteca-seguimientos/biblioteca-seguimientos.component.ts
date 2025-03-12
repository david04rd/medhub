import { Component, OnInit } from '@angular/core';
import { EntradaBiblioteca } from '../../../modelos/entradaBiblioteca';
import { EntradaBibliotecaService } from '../../../servicios/entradaBibliotecaService/entrada-biblioteca.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../modelos/usuario';

@Component({
  selector: 'app-biblioteca-seguimientos',
  templateUrl: './biblioteca-seguimientos.component.html',
  styleUrls: ['./biblioteca-seguimientos.component.css'],
})
export class BibliotecaSeguimientosComponent implements OnInit {
  seguimientos: EntradaBiblioteca[] = [];
  seguimientosFiltrados: EntradaBiblioteca[] = [];

  isAuthorized: boolean = false;
  filas: number = 3;
  paginaActual: number = 1;
  totalPaginas: number = 0;
  numeroPaginas: number[] = [];
  tituloBuscar: string = '';

  constructor(
    private entradaBibliotecaService: EntradaBibliotecaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioExists = localStorage.getItem('usuario');

    if (usuarioExists) {
      const usuario: Usuario = JSON.parse(usuarioExists);

      if ((usuario.permisos === 'ADMIN') || (usuario.permisos === 'AUTORIZADO')) {
        this.isAuthorized = true;
      }
    }

    this.entradaBibliotecaService.getEntradasBibliotecaByTipoEntradaBiblioteca('seguimiento').subscribe(
      (data: EntradaBiblioteca[]) => {
        this.seguimientos = data;
        this.seguimientosFiltrados = this.seguimientos;
        this.calcularTotalPaginas();
        this.generarNumeroPaginas();
      },
      (error) => {
        console.error('Error al obtener los seguimientos:', error);
      }
    );
  }

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.seguimientosFiltrados.length / this.filas);
  }

  generarNumeroPaginas(): void {
    this.numeroPaginas = [];
    for (let i = 1; i <= this.totalPaginas; i++) {
      this.numeroPaginas.push(i);
    }
  }

  goPaginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  goSiguientePagina(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

  goPagina(pageNumber: number): void {
    this.paginaActual = pageNumber;
  }

  get seguimientosSlice(): EntradaBiblioteca[] {
    const startIndex = (this.paginaActual - 1) * this.filas;
    const endIndex = startIndex + this.filas;
    return this.seguimientosFiltrados.slice(startIndex, endIndex);
  }

  navigateSeguimiento(id: number): void {
    this.router.navigate(['/lectorEntrada/', id]);
  }

  navigateCrearEntradaBiblioteca(tipoEntrada: string): void {
    this.router.navigate(['/crearEntradaBiblioteca/', tipoEntrada]);
  }

  filterSeguimientos(): void {
    if (this.tituloBuscar) {
      this.seguimientosFiltrados = this.seguimientos.filter((seguimiento) =>
        seguimiento.nombreEntrada.toLowerCase().includes(this.tituloBuscar.toLowerCase())
      );
    } else {
      this.seguimientosFiltrados = this.seguimientos;
    }
    this.calcularTotalPaginas();
    this.generarNumeroPaginas();
  }
}
