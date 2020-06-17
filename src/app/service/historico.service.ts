import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historico } from '../model/historico.model';

const url = 'http://localhost:8080/historico'
const urlHist = 'http://localhost:8080/historico/ordem'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  constructor(private http : HttpClient) { }

  consultar(): Observable<Historico[]>{
    return this.http.get<Historico[]>(url);
  }

  consultarHistoricoOrdem(id : number): Observable<Historico[]>{
    const urlLocal = `${urlHist}/${id}`;
    return this.http.get<Historico[]>(urlLocal);
  }



  consultarPorId(id : number): Observable<Historico[]>{
    const urlLocal = `${url}/${id}`;
    return this.http.get<Historico[]>(urlLocal);
  }



  adicionar(Historico): Observable<Historico>{
    return this.http.post<Historico>(url, Historico, httpOptions);
  }


  alterar(id, Historico): Observable<any>{
    const urlLocal = `${url}/${id}`;
    return this.http.put(urlLocal, Historico, httpOptions);
  }



  excluir(id): Observable<Historico>{
    const urlLocal = `${url}/${id}`;
    return this.http.delete<Historico>(urlLocal, httpOptions);
  }
}