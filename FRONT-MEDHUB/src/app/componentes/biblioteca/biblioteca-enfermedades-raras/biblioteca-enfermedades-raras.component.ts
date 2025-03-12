import { Component, OnInit } from '@angular/core';
import { EntradaBiblioteca } from '../../../modelos/entradaBiblioteca';
import { EntradaBibliotecaService } from '../../../servicios/entradaBibliotecaService/entrada-biblioteca.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../modelos/usuario';

@Component({
  selector: 'app-biblioteca-enfermedades-raras',
  templateUrl: './biblioteca-enfermedades-raras.component.html',
  styleUrls: ['./biblioteca-enfermedades-raras.component.css'],
})
export class BibliotecaEnfermedadesRarasComponent implements OnInit {
  enfermedadesRaras: EntradaBiblioteca[] = [];
  enfermedadesRarasFiltradas: EntradaBiblioteca[] = [];

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

    this.entradaBibliotecaService.getEntradasBibliotecaByTipoEntradaBiblioteca('enfermedad_rara').subscribe(
      (data: EntradaBiblioteca[]) => {
        this.enfermedadesRaras = data;
        this.enfermedadesRarasFiltradas = this.enfermedadesRaras;
        this.calcularTotalPaginas();
        this.generarNumeroPaginas();
      },
      (error) => {
        console.error('Error al obtener las enfermedades raras:', error);
      }
    );
  }

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.enfermedadesRarasFiltradas.length / this.filas);
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

  get enfermedadesRarasSlice(): EntradaBiblioteca[] {
    const startIndex = (this.paginaActual - 1) * this.filas;
    const endIndex = startIndex + this.filas;
    return this.enfermedadesRarasFiltradas.slice(startIndex, endIndex);
  }

  navigateEnfermedadRara(id: number): void {
    this.router.navigate(['/lectorEntrada/', id]);
  }

  navigateCrearEntradaBiblioteca(tipoEntrada: string): void {
    this.router.navigate(['/crearEntradaBiblioteca/', tipoEntrada]);
  }

  filterEnfermedadesRaras(): void {
    if (this.tituloBuscar) {
      this.enfermedadesRarasFiltradas = this.enfermedadesRaras.filter((enfermedad) =>
        enfermedad.nombreEntrada.toLowerCase().includes(this.tituloBuscar.toLowerCase())
      );
    } else {
      this.enfermedadesRarasFiltradas = this.enfermedadesRaras;
    }
    this.calcularTotalPaginas();
    this.generarNumeroPaginas();
  }
}
