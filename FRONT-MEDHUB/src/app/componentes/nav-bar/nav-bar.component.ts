import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/loginService/login.service';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  permisos: string = '';

  ngOnInit(): void {
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      const usuario: Usuario = JSON.parse(usuarioLocalStorage);
      this.permisos = usuario.permisos;
    } else {
      console.error('No se encontró el usuario en el LocalStorage');
    }
  }

  //Comprueba que el usuario este logueado para mostrar un boton especifico
  estaLogueado() {
    return this.loginService.isLoggedIn();
  }

  //Comprueba que el usuario este en la vista del login
  inLogin(): boolean {
    return this.router.url === '/login';
  }

  //Comprueba que el usuario este en la vista del registro
  inRegistro(): boolean {
    return this.router.url === '/registro';
  }

  //Si se entra a este componente se borran tanto token como usuario del localStorage
  logout() {
    this.loginService.logout();
  }

  isAdmin(): boolean {
    if (this.permisos === 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }
}
