import { Entrada } from "./entrada";
import { Usuario } from "./usuario";

//Clase modelo para los topicos en el front, se usa para enviar y recibir datos del back y mostrar los diferentes campos en cada componente.


export class Topico {
    id: number;
    nombreTopico: string;
    descripcion: string;
    autor: Usuario;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    ultimoAutorActualizacion: Usuario;

    constructor(
        id: number,
        nombreTopico: string,
        descripcion: string,
        autor: Usuario,
        fechaCreacion: Date,
        fechaActualizacion: Date,
        ultimoAutorActualizacion: Usuario,
    ) {
        this.id = id;
        this.nombreTopico = nombreTopico;
        this.descripcion = descripcion;
        this.autor = autor;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.ultimoAutorActualizacion = ultimoAutorActualizacion;
    }
}
