import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../../modelos/entrada';
import { NoticiaService } from '../../../servicios/noticiaService/noticia.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../modelos/usuario';

@Component({
  selector: 'app-hub-noticias',
  templateUrl: './hub-noticias.component.html',
  styleUrls: ['./hub-noticias.component.css'],
})
export class HubNoticiasComponent implements OnInit {
  noticias: Entrada[] = [];
  noticiasFiltradas: Entrada[] = [];

  isAdmin: boolean = false;
  //Delimita el numero de objetos por pagina
  filas: number = 3; 
  paginaActual: number = 1; 
  totalPaginas: number = 0; 
  numeroPaginas: number[] = []; 
  tituloBuscar: string = '';

  constructor(private noticiaService: NoticiaService, private router: Router) {}

  ngOnInit(): void {
    const usuarioExists = localStorage.getItem('usuario');

    if (usuarioExists) {
      const usuario: Usuario = JSON.parse(usuarioExists);

      if (usuario.permisos === 'ADMIN') {
        this.isAdmin = true;
      }
    }

    this.noticiaService.getNoticias().subscribe(
      (data: Entrada[]) => {
        this.noticias = data;
        this.noticiasFiltradas = this.noticias;
        this.calcularTotalPaginas();
        this.generarNumeroPaginas(); 
      },
      (error) => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }

  calcularTotalPaginas(): void {
    //Math.ceil redondea hacia abajo para crear el menor numero posible de paginas para optimizar la aplicacion
    this.totalPaginas = Math.ceil(this.noticiasFiltradas.length / this.filas);
  }

  //Genera paginas iguales al total
  generarNumeroPaginas(): void {
    this.numeroPaginas = [];
    for (let i = 1; i <= this.totalPaginas; i++) {
      //Envia al array la pagina con ese indice
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

  //Obtiene las noticias segun la pagina, por ejemplo si nos encontramos en la pagina 2, obtiene las noticias a partir de la 3 y las coloca en el HTML
  get noticiasSlice(): Entrada[] {
    const startIndex = (this.paginaActual - 1) * this.filas;
    const endIndex = startIndex + this.filas;
    return this.noticiasFiltradas.slice(startIndex, endIndex);
  }

  navigateNoticia(id: number): void {
    this.router.navigate(['/lectorNoticia/', id]);
  }

  navigateCrearNoticia(): void {
    this.router.navigate(['/crearNoticia']);
  }

  // Método de filtrado por el titulo
  filterNoticias(): void {
    //Comprueba que el texto del buscador no este vacio
    if (this.tituloBuscar) {
      //Si no lo esta llama a la funcion filter por el nombre de la entrada, y para evitar problemas con los caracteres lo pongo en lowerCase
      this.noticiasFiltradas = this.noticias.filter((noticia) =>
        noticia.nombreEntrada
          .toLowerCase()
          .includes(this.tituloBuscar.toLowerCase())
      );
    } else {
      //Si no hay texto se muestran las noticias
      this.noticiasFiltradas = this.noticias;
    }
    this.calcularTotalPaginas();
    this.generarNumeroPaginas();
  }
}
