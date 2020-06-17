import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdemServico } from '../model/ordem-servico.model';


const url = 'http://localhost:8080/ordemservico'
const urlCli = 'http://localhost:8080/ordemservico/cliente'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class OrdemServicoService {

  constructor(private http : HttpClient) { }

  consultar(): Observable<OrdemServico[]>{
    return this.http.get<OrdemServico[]>(url);
  }

  consultarOrdemCliente(id : number): Observable<OrdemServico[]>{
    const urlLocal = `${urlCli}/${id}`;
    return this.http.get<OrdemServico[]>(urlLocal);
  }

  consultarPorId(id : number): Observable<OrdemServico[]>{
    const urlLocal = `${url}/${id}`;
    return this.http.get<OrdemServico[]>(urlLocal);
  }



  adicionar(OrdemServico): Observable<OrdemServico>{
    return this.http.post<OrdemServico>(url, OrdemServico, httpOptions);
  }


  alterar(id, OrdemServico): Observable<any>{
    const urlLocal = `${url}/${id}`;
    return this.http.put(urlLocal, OrdemServico, httpOptions);
  }



  excluir(id): Observable<OrdemServico>{
    const urlLocal = `${url}/${id}`;
    return this.http.delete<OrdemServico>(urlLocal, httpOptions);
  }
}