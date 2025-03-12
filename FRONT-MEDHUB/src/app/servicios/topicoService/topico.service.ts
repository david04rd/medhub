import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topico } from '../../modelos/topico';

//Servicio para interaccionar con las funciones de los topicos en el back-end 

@Injectable({
  providedIn: 'root',
})
export class TopicoService {
  private apiUrl = 'http://localhost:8080/topicos'; 

  constructor(private http: HttpClient) {}

  getTopicos(): Observable<Topico[]> {
    return this.http.get<Topico[]>(this.apiUrl+"/obtenerTopicos");
  }

  borrarTopico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrarTopico/${id}`);
  }

  actualizarTopico(topico: Topico): Observable<any> {
    const url = `${this.apiUrl}/actualizarTopico/${topico.id}`;
    return this.http.put(url, topico);
  }
}
