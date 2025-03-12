import { Injectable } from '@angular/core';
import { EntradaBiblioteca } from '../../modelos/entradaBiblioteca';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntradaBibliotecaService {
  private apiUrl: string = 'http://localhost:8080/serv-biblioteca';
  constructor(private http: HttpClient) {}

  getEntradasBibliotecaByTipoEntradaBiblioteca(
    tipoEntradaBiblioteca: string
  ): Observable<EntradaBiblioteca[]> {
    return this.http.get<EntradaBiblioteca[]>(
      `${this.apiUrl}/entradasBibliotecas/${tipoEntradaBiblioteca}`
    );
  }

  getEntradaBibliotecaById(id: number): Observable<EntradaBiblioteca> {
    return this.http.get<EntradaBiblioteca>(
      `${this.apiUrl}/entradaBiblioteca/${id}`
    );
  }

  deleteEntradaBiblioteca(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/deleteEntradaBiblioteca/${id}`,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  // Método para enviar una entrada de biblioteca al backend y guardarla en la base de datos
  sendEntradaBiblioteca(entrada: EntradaBiblioteca,idUsuario:number): Observable<any> {
    // Convierto los datos de la entrada del formulario a un FormData
    const formData: FormData = new FormData();
    formData.append('nombreEntrada', entrada.nombreEntrada);
    formData.append('contenido', entrada.contenido);
    formData.append('autorId', String(idUsuario));
    formData.append('fechaCreacion', entrada.fechaCreacion.toISOString());
    formData.append(
      'fechaActualizacion',
      entrada.fechaActualizacion.toISOString()
    );
    formData.append(
      'ultimoAutorActualizacionId',
      String(idUsuario)
    );
    formData.append('tipoEntradaBiblioteca', entrada.tipoEntradaBiblioteca);
    if (entrada.portada) {
      formData.append('portada', entrada.portada);
    }

    // Envío la entrada al backend
    return this.http.post<any>(
      `${this.apiUrl}/sendEntradaBiblioteca`,
      formData
    );
  }
}
