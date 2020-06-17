import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

const url = 'http://localhost:8080/login'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  usuarioAutenticado: boolean= false;
 
  constructor(private http : HttpClient, private router: Router) { }

consultarUsuario(Login): Observable<Usuario>{
  return this.http.post<Usuario>(url,Login,httpOptions)
}
usuarioEstaAutenticado(){
  return this.usuarioAutenticado;
}

}