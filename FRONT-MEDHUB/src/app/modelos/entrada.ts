import { Topico } from './topico';
import { Usuario } from './usuario';

//Clase modelo para las entradas en el front, se usa para enviar y recibir datos del back y mostrar los diferentes campos en cada componente.

export class Entrada {
  id: number;
  nombreEntrada: string;
  contenido: string;
  autor: Usuario;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  ultimoAutorActualizacion: Usuario;
  topicosAsociados: Topico[];
  portada: Blob;

  constructor(
    id: number,
    nombreEntrada: string,
    contenido: string,
    autor: Usuario,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    ultimoAutorActualizacion: Usuario,
    topicosAsociados: Topico[],
    portada: Blob
  ) {
    this.id = id;
    this.nombreEntrada = nombreEntrada;
    this.contenido = contenido;
    this.autor = autor;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
    this.ultimoAutorActualizacion = ultimoAutorActualizacion;
    this.topicosAsociados = topicosAsociados;
    this.portada = portada;
  }
}
