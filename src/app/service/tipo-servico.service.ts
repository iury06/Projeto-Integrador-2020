import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoServico } from '../model/tipo-servico.model';

const url = 'http://localhost:8080/tiposervico'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class TipoServicoService {
  constructor(private http : HttpClient) { }

  consultar(): Observable<TipoServico[]>{
    return this.http.get<TipoServico[]>(url);
  }



  consultarPorId(id : number): Observable<TipoServico[]>{
    const urlLocal = `${url}/${id}`;
    return this.http.get<TipoServico[]>(urlLocal);
  }



  adicionar(TipoServico): Observable<TipoServico>{
    return this.http.post<TipoServico>(url, TipoServico, httpOptions);
  }


  alterar(id, TipoServico): Observable<any>{
    const urlLocal = `${url}/${id}`;
    return this.http.put(urlLocal, TipoServico, httpOptions);
  }



  excluir(id): Observable<TipoServico>{
    const urlLocal = `${url}/${id}`;
    return this.http.delete<TipoServico>(urlLocal, httpOptions);
  }
}