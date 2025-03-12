import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwalMessagesService } from '../swalService/swal-messages.service';

//Clase que sirve para enviar peticiones http relacionadas con el login al back-end

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  //Constructor para inyectar los servicios al servicio
  constructor(
    private http: HttpClient,
    private router: Router,
    private swalMessageService:SwalMessagesService
  ) {}

  private apiUrl = 'http://localhost:8080/login';

  login(nombreUsuario: string, contrasenna: string) {
    // Crear el objeto con el nombre de usuario y la contraseña
    const loginData = {
      nombreUsuario: nombreUsuario,
      contrasenna: contrasenna,
    };

    // Lo envío por post
    return this.http.post<any>(this.apiUrl, loginData).subscribe({
      // Si todo sale correctamente
      next: (res) => {
        // Recibo el token de la respuesta y lo almaceno en localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        //Redirecciono al usuario a la pantalla correspondiente al inicio
        this.router.navigate(['']);

        //En base a lo que ocurra muestro un mensaje de un tipo u otro como emergente
        this.swalMessageService.showSuccess( res.usuario.nombreUsuario,'¡Bienvenido a MedHub!');
      },
      error: (err) => {
        this.swalMessageService.showError(
          'Datos introducidos incorrectos',
          'ERROR'
        )
      },
    });
  }

  //Comprueba si el usuario esta logado para devolver el token
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token==null) {
      return false;
    } else {
      return true;
    }
  }

  //Elimina el token de local storage al igual que el usuario y lo redirige al login (Cerrar sesion)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
