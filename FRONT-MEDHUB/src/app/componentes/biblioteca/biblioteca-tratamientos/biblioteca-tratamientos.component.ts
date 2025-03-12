import { Component, OnInit } from '@angular/core';
import { EntradaBiblioteca } from '../../../modelos/entradaBiblioteca';
import { EntradaBibliotecaService } from '../../../servicios/entradaBibliotecaService/entrada-biblioteca.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../modelos/usuario';

@Component({
  selector: 'app-biblioteca-tratamientos',
  templateUrl: './biblioteca-tratamientos.component.html',
  styleUrls: ['./biblioteca-tratamientos.component.css'],
})
export class BibliotecaTratamientosComponent implements OnInit {
  tratamientos: EntradaBiblioteca[] = [];
  tratamientosFiltrados: EntradaBiblioteca[] = [];

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

      console.log(usuario.permisos );
      if ((usuario.permisos === 'ADMIN') || (usuario.permisos === 'AUTORIZADO')) {
        this.isAuthorized = true;
      }
    }

    this.entradaBibliotecaService.getEntradasBibliotecaByTipoEntradaBiblioteca('tratamiento').subscribe(
      (data: EntradaBiblioteca[]) => {
        this.tratamientos = data;
        this.tratamientosFiltrados = this.tratamientos;
        this.calcularTotalPaginas();
        this.generarNumeroPaginas();
      },
      (error) => {
        console.error('Error al obtener los tratamientos:', error);
      }
    );
  }

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.tratamientosFiltrados.length / this.filas);
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

  get tratamientosSlice(): EntradaBiblioteca[] {
    const startIndex = (this.paginaActual - 1) * this.filas;
    const endIndex = startIndex + this.filas;
    return this.tratamientosFiltrados.slice(startIndex, endIndex);
  }

  navigateTratamiento(id: number): void {
    this.router.navigate(['/lectorEntrada/', id]);
  }

  navigateCrearEntradaBiblioteca(tipoEntrada:string): void {
    this.router.navigate(['/crearEntradaBiblioteca/',tipoEntrada]);
  }

  filterTratamientos(): void {
    if (this.tituloBuscar) {
      this.tratamientosFiltrados = this.tratamientos.filter((tratamiento) =>
        tratamiento.nombreEntrada.toLowerCase().includes(this.tituloBuscar.toLowerCase())
      );
    } else {
      this.tratamientosFiltrados = this.tratamientos;
    }
    this.calcularTotalPaginas();
    this.generarNumeroPaginas();
  }
}
