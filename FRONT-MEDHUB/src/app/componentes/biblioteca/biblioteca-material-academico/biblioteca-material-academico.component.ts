import { Component, OnInit } from '@angular/core';
import { EntradaBiblioteca } from '../../../modelos/entradaBiblioteca';
import { EntradaBibliotecaService } from '../../../servicios/entradaBibliotecaService/entrada-biblioteca.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../modelos/usuario';

@Component({
  selector: 'app-biblioteca-material-academico',
  templateUrl: './biblioteca-material-academico.component.html',
  styleUrls: ['./biblioteca-material-academico.component.css'],
})
export class BibliotecaMaterialAcademicoComponent implements OnInit {
  materialAcademico: EntradaBiblioteca[] = [];
  materialAcademicoFiltrado: EntradaBiblioteca[] = [];

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

    this.entradaBibliotecaService.getEntradasBibliotecaByTipoEntradaBiblioteca('material_academico').subscribe(
      (data: EntradaBiblioteca[]) => {
        this.materialAcademico = data;
        this.materialAcademicoFiltrado = this.materialAcademico;
        this.calcularTotalPaginas();
        this.generarNumeroPaginas();
      },
      (error) => {
        console.error('Error al obtener el material académico:', error);
      }
    );
  }

  calcularTotalPaginas(): void {
    this.totalPaginas = Math.ceil(this.materialAcademicoFiltrado.length / this.filas);
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

  get materialAcademicoSlice(): EntradaBiblioteca[] {
    const startIndex = (this.paginaActual - 1) * this.filas;
    const endIndex = startIndex + this.filas;
    return this.materialAcademicoFiltrado.slice(startIndex, endIndex);
  }

  navigateMaterialAcademico(id: number): void {
    this.router.navigate(['/lectorEntrada/', id]);
  }

  navigateCrearEntradaBiblioteca(tipoEntrada: string): void {
    this.router.navigate(['/crearEntradaBiblioteca/', tipoEntrada]);
  }

  filterMaterialAcademico(): void {
    if (this.tituloBuscar) {
      this.materialAcademicoFiltrado = this.materialAcademico.filter((material) =>
        material.nombreEntrada.toLowerCase().includes(this.tituloBuscar.toLowerCase())
      );
    } else {
      this.materialAcademicoFiltrado = this.materialAcademico;
    }
    this.calcularTotalPaginas();
    this.generarNumeroPaginas();
  }
}
