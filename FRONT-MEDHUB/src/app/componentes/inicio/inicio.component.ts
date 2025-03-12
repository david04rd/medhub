import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../modelos/entrada';
import { NoticiaService } from '../../servicios/noticiaService/noticia.service';
import { Router } from '@angular/router';

//Componente para el inicio de la aplicacion (hub principal).
//Este componente principalmente mostrará las 3 noticias más
//novedosas publicadas en la aplicación para su acceso

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  noticias: Entrada[] = [];

  //Inyeccion de servicios
  constructor(private noticiaService: NoticiaService, private router: Router) {}

  ngOnInit(): void {
    // obtengo las noticias más nuevas
    this.noticiaService.getNoticiasRecientes().subscribe(
      (data: Entrada[]) => {
        this.noticias = data;
      },
      (error) => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }

  navigateNoticia(id: number): void {
    this.router.navigate(['/lectorNoticia/', id]);
  }
}
