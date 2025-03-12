import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Servicio para interaccionar con las funciones del registro en el back-end 

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:8080/registro';

  constructor(private http:HttpClient){}

  registro(usuario:any){
    console.log("llamando al registrarUsuario")
    return this.http.post<any>(this.apiUrl+"/registrarUsuario", usuario);
  }

  usuarioIsRegistrado(usuario:any){
    return this.http.post<any>(this.apiUrl+"/comprobarUsuario", usuario);
  }

  emailIsRegistrado(usuario:any){
    return this.http.post<any>(this.apiUrl+"/comprobarEmail", usuario);

  }
    
  }




