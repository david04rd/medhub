import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginGuardian } from './guardianes/loginGuard/login.guard';
import { ErrorPageNotFoundComponent } from './componentes/error-page-not-found/error-page-not-found.component';
import { HubForoComponent } from './componentes/foro/hub/hub-foro/hub-foro.component';
import { HubNoticiasComponent } from './componentes/noticias/hub-noticias/hub-noticias.component';
import { LectorNoticiaComponent } from './componentes/noticias/lector-noticia/lector-noticia.component';
import { CrearNoticiaComponent } from './componentes/noticias/crear-noticia/crear-noticia.component';
import { AdminGuardian } from './guardianes/adminGuard/admin.guard';
import { BibliotecaEnfermedadesRarasComponent } from './componentes/biblioteca/biblioteca-enfermedades-raras/biblioteca-enfermedades-raras.component';
import { BibliotecaMaterialAcademicoComponent } from './componentes/biblioteca/biblioteca-material-academico/biblioteca-material-academico.component';
import { BibliotecaTratamientosComponent } from './componentes/biblioteca/biblioteca-tratamientos/biblioteca-tratamientos.component';
import { BibliotecaSeguimientosComponent } from './componentes/biblioteca/biblioteca-seguimientos/biblioteca-seguimientos.component';
import { CrearEntradaBibliotecaComponent } from './componentes/biblioteca/crear-entrada-biblioteca/crear-entrada-biblioteca.component';
import { AuthorizedGuard } from './guardianes/authorizedGuard/authorized.guard';
import { LectorEntradaBibliotecaComponent } from './componentes/biblioteca/lector-entrada-biblioteca/lector-entrada-biblioteca.component';
import { ListadoTopicosComponent } from './componentes/topicos/listado-topicos/listado-topicos.component';

//Esta clase se genera de forma automatica al hacer ng new MedHub
//Aqui se declaran todos las rutas asociadas a un componente.
//Además en cada ruta podemos asociarle un guardian para controlar el acceso del usuario a ciertas vistas mediante la propiedad canActivate.

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'hub-noticias',
    component: HubNoticiasComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'biblioteca/enfermedadesRaras',
    component: BibliotecaEnfermedadesRarasComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'biblioteca/materialAcademico',
    component: BibliotecaMaterialAcademicoComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'biblioteca/tratamientos',
    component: BibliotecaTratamientosComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'biblioteca/seguimientos',
    component: BibliotecaSeguimientosComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'crearEntradaBiblioteca/:tipoEntrada',
    component: CrearEntradaBibliotecaComponent,
    canActivate: [LoginGuardian, AuthorizedGuard],
  },
  {
    path: 'lectorEntrada/:id',
    component: LectorEntradaBibliotecaComponent,
    canActivate: [LoginGuardian, AuthorizedGuard],
  },
  { path: '', component: InicioComponent, canActivate: [LoginGuardian] },
  { path: 'foro', component: HubForoComponent, canActivate: [LoginGuardian] },
  {
    path: 'crearNoticia',
    component: CrearNoticiaComponent,
    canActivate: [LoginGuardian, AdminGuardian],
  },
  {
    path: 'lectorNoticia/:id',
    component: LectorNoticiaComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'topicos/hub-topicos',
    component: ListadoTopicosComponent,
    canActivate: [LoginGuardian,AdminGuardian],
  },

  //Si se inserta una ruta no contemplada se redirige a este componente
  {
    path: '**',
    component: ErrorPageNotFoundComponent,
    canActivate: [LoginGuardian],
  },
];

//Usamos router module para poder viajar entre vistas
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
