import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';

// Guardian que controla el acceso de un usuario a las pantallas de la aplicación.Comprueba que este sea admin para poder acceder a ciertas pantallas

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario: Usuario = JSON.parse(usuarioString);

      if ((usuario.permisos === 'ADMIN') || (usuario.permisos === 'AUTORIZADO')) {
        return true;
      } else {
        this.router.navigate(['notAuthorized']);
        return false;
      }
    } else {
      return false;
    }
  }
}
