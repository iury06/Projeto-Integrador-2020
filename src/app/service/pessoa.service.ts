import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../model/pessoa.model';


const url = 'http://localhost:8080/pessoa'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  constructor(private http : HttpClient) { }

  consultar(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(url);
  }



  consultarPorId(pes_perfil : string): Observable<Pessoa[]>{
    const urlLocal = `${url}/${pes_perfil}`;
    return this.http.get<Pessoa[]>(urlLocal);
  }



  adicionar(Pessoa): Observable<Pessoa>{
    return this.http.post<Pessoa>(url, Pessoa, httpOptions);
  }


  alterar(id, Pessoa): Observable<any>{
    const urlLocal = `${url}/${id}`;
    return this.http.put(urlLocal, Pessoa, httpOptions);
  }



  excluir(id): Observable<Pessoa>{
    const urlLocal = `${url}/${id}`;
    return this.http.delete<Pessoa>(urlLocal, httpOptions);
  }
}