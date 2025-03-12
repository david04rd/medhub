import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';

// Guardian que controla el acceso de un usuario a las pantallas de la aplicación.Comprueba que este logado para poder acceder a ciertas pantallas

@Injectable()
export class LoginGuardian implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);

      return true;
    }
  }
}
