import { Component, OnInit } from '@angular/core';
import { Historico } from '../model/historico.model';
import { OrdemServico } from '../model/ordem-servico.model';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { OrdemServicoService } from '../service/ordem-servico.service';
import { TipoServicoService } from '../service/tipo-servico.service';
import { HistoricoService } from '../service/historico.service';
import { LaboratorioSalaService } from '../service/laboratorio-sala.service';
import { TipoServico } from '../model/tipo-servico.model';
import { LaboratorioSala } from '../model/laboratorio-sala.model';
import { LoginService } from '../login/login.service';
import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordem-cliente',
  templateUrl: './ordem-cliente.component.html',
  styleUrls: ['./ordem-cliente.component.css']
})
export class OrdemClienteComponent implements OnInit {

  display: boolean = false;
  objetoLog:[];
  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;
//
  lista : OrdemServico[] = []; 
  obj: OrdemServico = new OrdemServico();
//

listaServico: TipoServico[] = [];
  objServicoSel = TipoServico;
//

//
listaLaboratorio: LaboratorioSala[] = [];
  objLaboratorioSel = LaboratorioSala;
//
 
objHistorico: Historico;
listaHistorico: Historico[] = []; 

//
objUser: Usuario = new Usuario();

 objLog: number[] = [];

  ordemSelecionada: OrdemServico = {
    os_id: null,
    os_data_emisao: null,
    os_data_fechamento: null,
    os_descricao: null,
    os_local: null,
    os_status: null,
    pessoaCli: null,
    pessoaFun: null,
    tipoServico: null,
    laboratorioSala: null,
   
  };

  constructor(private api: OrdemServicoService, private apiServico: TipoServicoService, private apiLaboratorio: LaboratorioSalaService,
     private apiHistorico: HistoricoService, private messageService: MessageService, private apiLogin: LoginService, private router:Router) { }

  
  /*consultar(){
    this.api.consultar()
    .toPromise()
    .then
    (res => {
      this.lista = res;
    });
  }
*/


consultarLog(){
  this.apiLogin.consultarUsuario(this.objUser).toPromise()
  .then(Login => {
  this.objLog = Login[0];
    console.log("id user: "+this.objLog[0]);

    this.consultarOrdemCliente();
  })
}

//consultar ordem atraves do id cliente


consultarOrdemCliente(){
this.api.consultarOrdemCliente(this.objLog[0])
.toPromise()
.then
(res => {
 this.lista = res;
 //console.log("Lista criada:"+ (this.lista))
});

}

adicionar() {
  if(this.obj.os_descricao == null|| this.obj.os_local == null || this.obj.tipoServico.descricao == null || this.obj.laboratorioSala.nome == null ){
   this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Campos obrigatorio!"});
     return;
 }
    
  this.obj.pessoaCli.id = this.objLog[0];// add id cliente logado
  this.obj.os_data_emisao = new Date();
  this.obj.os_status = "aberto";
  this.obj.pessoaFun.id = 15;
//  this.obj.pessoaCli.id = this.;

  this.api.adicionar(this.obj).subscribe(
    (result: any) => {
      let obj = result as OrdemServico;
      this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Item adicionado com sucesso!" });
      this.adicionarHistorico(result, 'I');
      
      this.displaySaveDialog = false;
      //this.consultar();
      this.consultarOrdemCliente();
    },
    error => {
      console.log(error);
    }
  );
}



  showDialog(consultar: boolean) {
    if(this.ordemSelecionada == null || this.ordemSelecionada.os_id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor selecione um registro"});
      return;
    }else{
      this.consultarHistoricoOrdem();
     this.display=true;
    }

}



  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.ordemSelecionada != null && this.ordemSelecionada.os_id != null) {
        this.obj = this.ordemSelecionada;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
        return;
      }
    } else {
      this.obj = new OrdemServico();
    }
    this.displaySaveDialog = true;
  }


  

 
      //consultar historico atraves do id ordem
  consultarHistoricoOrdem(){
    this.apiHistorico.consultarHistoricoOrdem(this.ordemSelecionada.os_id)

    .toPromise()
    .then
    (res => {
      this.listaHistorico = res;
      //console.log("Lista criada:"+ (this.listaHistorico))
    });

  }



  adicionarHistorico(objOrdem : OrdemServico, acao:string){
    this.objHistorico = new Historico();
  // preencher dados
  
    this.objHistorico.ordemServico = objOrdem;
    this.objHistorico.hist_data = new Date();
    this.objHistorico.hist_status = objOrdem.os_status;
    this.objHistorico.pessoa = objOrdem.pessoaFun;
  
    //console.log("Objeto criaado:"+ JSON.stringify(this.objHistorico))
    this.apiHistorico.adicionar(this.objHistorico);
    this.apiHistorico.adicionar(this.objHistorico).toPromise().then(res => {console.log("objeto Adicionado: "+JSON.stringify(res))});
    //this.consultar();
    this.consultarOrdemCliente();
    }
  


  // tipo servico
consultarTipoServico() {
  this.apiServico.consultar()
  .toPromise()
  .then
  (res => {
    this.listaServico = res;
  });
} 

atribuirTipoServico(id) {
  this.obj.tipoServico.id = id;
  console.log(`TipoServico: ${this.obj.tipoServico.id}`);
}
// ^^ tipo servico

// laboratorio
consultarLaboratorio() {
  this.apiLaboratorio.consultar()
  .toPromise()
  .then
  (res => {
    this.listaLaboratorio = res;
  });
} 


atribuirLaboratorio(id) {
  this.obj.laboratorioSala.id = id;
  console.log(`LaboratorioSala: ${this.obj.laboratorioSala.id}`);
}
// ^^ laboratorio





ngOnInit():void{
  this.consultarLog();
  //this.consultar();
  this.consultarLaboratorio();
  this.consultarTipoServico();

  this.cols = [
    
    { field: "os_id", header: "Numero do Pedido" },
    // { field: "os_data_emisao", header: "Data Pedido" },
     //{ field: "os_descricao", header: "Descrição" },
     //{ field: "os_local", header: "local" },
     //{ field: "tipoServico", header: "Servico" },
    //{ field: "laboratorioSala", header: "Laboratorio" },
     //{ field: "pessoaCli", header: "Solicitante" },
  ];

    this.items = [
      {
        label: "Novo pedido",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false)
      },
      {
        
          label: "Historico",
          icon: 'pi pi-fw pi-check',
          command: () =>this.showDialog(true)
          
      },
      {
        
        label: "Sair",
        icon: 'pi pi-fw pi-user',
        command: () =>this.router.navigate(['/login'])},
        
    ]

  }

}