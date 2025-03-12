import { Usuario } from './usuario';

//Clase modelo para las entradas de la biblioteca en el front, se usa para enviar y recibir datos del back y mostrar los diferentes campos en cada componente.

export class EntradaBiblioteca {
  id: number;
  nombreEntrada: string;
  contenido: string;
  autor: Usuario;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  ultimoAutorActualizacion: Usuario;
  portada: Blob;
  tipoEntradaBiblioteca: string;

  constructor(
    id: number,
    nombreEntrada: string,
    contenido: string,
    autor: Usuario,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    ultimoAutorActualizacion: Usuario,
    portada: Blob,
    tipoEntradaBiblioteca: string
  ) {
    this.id = id;
    this.nombreEntrada = nombreEntrada;
    this.contenido = contenido;
    this.autor = autor;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
    this.ultimoAutorActualizacion = ultimoAutorActualizacion;
    this.portada = portada;
    this.tipoEntradaBiblioteca = tipoEntradaBiblioteca;
  }
}
