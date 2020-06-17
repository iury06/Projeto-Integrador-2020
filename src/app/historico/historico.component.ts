import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'primeng/api';
import { Historico } from '../model/historico.model';
import { HistoricoService } from '../service/historico.service';



@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;


  lista : Historico[] = []; 
  obj: Historico = new Historico();
  historico = '';

  constructor(private api: HistoricoService ) { }

  consultar(){
    this.api.consultar()
    .toPromise()
    .then
    (res => {
      this.lista = res;
    });
  }

// ^^ Ordem servico

  ngOnInit():void{
    this.consultar();
    this.cols = [
       //{ field: "id", header: "id" },
     // { field: "hist_status", header: "Status" },
     // { field: "hist_data", header: "Data historico" },
     // { field: "ordemServico", header: "OS" },
      //{ field: "pessoa", header: "Pessoa" },
    

    ];


  }

}

