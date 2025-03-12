import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './servicios/loginService/login.service';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardian } from './guardianes/loginGuard/login.guard';
import { ErrorPageNotFoundComponent } from './componentes/error-page-not-found/error-page-not-found.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HubForoComponent } from './componentes/foro/hub/hub-foro/hub-foro.component';
import { LectorNoticiaComponent } from './componentes/noticias/lector-noticia/lector-noticia.component';
import { HubNoticiasComponent } from './componentes/noticias/hub-noticias/hub-noticias.component';
import { CrearNoticiaComponent } from './componentes/noticias/crear-noticia/crear-noticia.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AdminGuardian } from './guardianes/adminGuard/admin.guard';
import { BibliotecaEnfermedadesRarasComponent } from './componentes/biblioteca/biblioteca-enfermedades-raras/biblioteca-enfermedades-raras.component';
import { BibliotecaTratamientosComponent } from './componentes/biblioteca/biblioteca-tratamientos/biblioteca-tratamientos.component';
import { BibliotecaMaterialAcademicoComponent } from './componentes/biblioteca/biblioteca-material-academico/biblioteca-material-academico.component';
import { BibliotecaSeguimientosComponent } from './componentes/biblioteca/biblioteca-seguimientos/biblioteca-seguimientos.component';
import { CrearEntradaBibliotecaComponent } from './componentes/biblioteca/crear-entrada-biblioteca/crear-entrada-biblioteca.component';
import { AuthorizedGuard } from './guardianes/authorizedGuard/authorized.guard';
import { NavEntradasBibliotecaComponent } from './componentes/biblioteca/nav-entradas-biblioteca/nav-entradas-biblioteca.component';
import { LectorEntradaBibliotecaComponent } from './componentes/biblioteca/lector-entrada-biblioteca/lector-entrada-biblioteca.component';
import { ListadoTopicosComponent } from './componentes/topicos/listado-topicos/listado-topicos.component';

//Esta clase se genera de forma automatica al hacer ng new MedHub
//Aqui se declaran todos los componentes, modulos y servicios, además de los guardianes.

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    InicioComponent,
    ErrorPageNotFoundComponent,
    NavBarComponent,
    FooterComponent,
    HubForoComponent,

    HubNoticiasComponent,
    CrearNoticiaComponent,
    LectorNoticiaComponent,
    BibliotecaEnfermedadesRarasComponent,
    BibliotecaTratamientosComponent,
    BibliotecaMaterialAcademicoComponent,
    BibliotecaSeguimientosComponent,
    CrearEntradaBibliotecaComponent,
    NavEntradasBibliotecaComponent,
    LectorEntradaBibliotecaComponent,
    ListadoTopicosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
  ],
  providers: [LoginService, LoginGuardian, AdminGuardian,AuthorizedGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
