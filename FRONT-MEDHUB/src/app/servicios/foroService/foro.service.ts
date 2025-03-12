import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Clase que sirve para enviar peticiones http relacionadas con el foro al back-end

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  private baseUrl = 'http://localhost:8080/busqueda';

  constructor(private http: HttpClient) { }

  buscarForosPorTituloLike(tituloId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/buscarForo/${tituloId}`);
  }
}
