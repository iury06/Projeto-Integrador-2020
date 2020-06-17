import { Component, OnInit } from '@angular/core';
import { OrdemServicoService } from '../service/ordem-servico.service';
import { OrdemServico } from '../model/ordem-servico.model';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  data: any;
  lista : OrdemServico[] = []; 
  obj: OrdemServico = new OrdemServico();


  constructor(private api:OrdemServicoService) { }


  consultar(){
    this.api.consultar()
    .toPromise()
    .then

    (res => {
      this.lista = res;
      console.log("Lista criada Relatorio:"+this.lista);

    });
  }

  ngOnInit() {
    this.consultar();

        this.data = {
            labels: ['Aberto','Aguardo Peças','Em manuteção'],
            datasets: [
                {
                    data: [300, 10, 150],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"

                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };
    }
  }

