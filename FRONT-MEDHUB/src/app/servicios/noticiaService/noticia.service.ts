import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entrada } from '../../modelos/entrada';
import { Observable } from 'rxjs';

//Servicio para interaccionar con las noticias con el back-end 

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  private apiUrl: string = 'http://localhost:8080/serv-noticias'; 
  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(`${this.apiUrl}/noticias`);
  }

  getNoticiasRecientes(): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(`${this.apiUrl}/noticiasRecientes`);
  }

  getNoticiaById(id: number): Observable<Entrada> {
    return this.http.get<Entrada>(`${this.apiUrl}/noticia/${id}`);
  }

  //Envía la noticia al back para guardarla en la base de datos
  sendNoticia(noticia: Entrada, idUsuario: number): Observable<any> {

    //Convierto los datos de la noticia del FormData
    const formData: FormData = new FormData();
    formData.append('nombreEntrada', noticia.nombreEntrada);
    formData.append('contenido', noticia.contenido);
    formData.append('autorId', String(idUsuario)); 
    formData.append('fechaCreacion', noticia.fechaCreacion.toISOString());
    //Uso ISOString para convertir la fecha a String
    formData.append(
      'fechaActualizacion',
      noticia.fechaActualizacion.toISOString()
    );
    formData.append('ultimoAutorActualizacionId', String(idUsuario)); // Enviar el id del usuario autor como String (primera vez que se crea se asocia al autor creador la última fecha de actualización)
    formData.append(
      'topicosAsociados',
      JSON.stringify(noticia.topicosAsociados.map((topico) => topico.id))
    );
    if (noticia.portada) {
      formData.append('portada', noticia.portada);
    }

    return this.http.post<any>(`${this.apiUrl}/sendNoticia`, formData);
  }

  deleteNoticia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteNoticia/${id}`, { responseType: 'text' as 'json' });
}

}
