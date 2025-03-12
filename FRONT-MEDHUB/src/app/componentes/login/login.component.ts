import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  datosUsuario = {
    nombreUsuario: '',
    contrasenna: '',
  };

  //Si se entra a este componente se borran tanto token como usuario del localStorage
  ngOnInit(): void {
    this.loginService.logout();
  }

  //Llama al login service y envia los datos para comprobar si el usuario es valido o no
  iniciarSesion() {
    this.loginService.login(
      this.datosUsuario.nombreUsuario,
      this.datosUsuario.contrasenna
    );
  }
}
