
//Clase modelo para los usuarios en el front, se usa para enviar y recibir datos del back y mostrar los diferentes campos en cada componente.

export class Usuario {
  nombreUsuario: string;
  contrasenna: string;
  email: string;
  permisos: string;
  entradasAsociadas: any[]; 
  constructor(
    nombreUsuario: string,
    contrasenna: string,
    email: string,
    permisos: string,
    entradasAsociadas: any[] 
  ) {
    this.nombreUsuario = nombreUsuario;
    this.contrasenna = contrasenna;
    this.email = email;
    this.permisos = permisos;
    this.entradasAsociadas = entradasAsociadas || []; 
  }
}
