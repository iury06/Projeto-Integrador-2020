import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { OrdemServico } from '../model/ordem-servico.model';
import { OrdemServicoService } from '../service/ordem-servico.service';
import { TipoServicoService } from '../service/tipo-servico.service';
import { LaboratorioSalaService } from '../service/laboratorio-sala.service';
import { PessoaService } from '../service/pessoa.service';
import { Pessoa } from '../model/pessoa.model';
import { TipoServico } from '../model/tipo-servico.model';
import { LaboratorioSala } from '../model/laboratorio-sala.model';
import { Historico } from '../model/historico.model';
import { HistoricoService } from '../service/historico.service';


@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css']
})
export class OrdemServicoComponent implements OnInit {

  display: boolean = false;

  status: SelectItem[];

  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;
  activeIndex: number = 1;
//
  lista : OrdemServico[] = []; 
  obj: OrdemServico = new OrdemServico();
//

//
 listaCli: Pessoa[] = [];
  objClienteSel = Pessoa;
//

//
listaFun: Pessoa[] = [];
objFuncionarioSel = Pessoa;
//

//
listaServico: TipoServico[] = [];
  objServicoSel = TipoServico;
//

//
listaLaboratorio: LaboratorioSala[] = [];
  objLaboratorioSel = LaboratorioSala;
//
 

//
objHistorico: Historico;
listaHistorico: Historico[] = []; 

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
    laboratorioSala: null
   
  };

  constructor(private api: OrdemServicoService, private apiServico: TipoServicoService, private apiLaboratorio: LaboratorioSalaService,
    private apiPessoa: PessoaService, private apiHistorico: HistoricoService, private messageService: MessageService, 
private confirmService: ConfirmationService) { }

  
  consultar(){
    this.api.consultar()
    .toPromise()
    .then
    (res => {
      this.lista = res;
    });
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

  adicionar() {
    if(this.obj.laboratorioSala == null|| this.obj.os_descricao == null|| this.obj.os_local == null|| this.obj.os_status == null
       || this.obj.tipoServico == null || this.obj.pessoaFun == null || this.obj.pessoaCli == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Campos obrigatorio!"});
        return;
    }
    this.obj.os_data_emisao = new Date(),
    this.api.adicionar(this.obj).subscribe(
      (result: any) => {
        let obj = result as OrdemServico;
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Item adicionado com sucesso!" });
        this.adicionarHistorico(result, 'I');
        
        this.displaySaveDialog = false;
        this.consultar();
      },
      error => {
        console.log(error);
      }
    );
  }


  alterar(){
    if(this.ordemSelecionada == null || this.ordemSelecionada.os_id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor selecione um registro"});
      return;
    }
    this.confirmService.confirm({
      message: "Esta seguro, deseja editar esse Registro?",
      accept : () =>{


        if(this.ordemSelecionada.os_status == 'concluido' || this.ordemSelecionada.os_status == 'cancelado'){
          this.ordemSelecionada.os_data_fechamento = new Date(), this.obj;
        }
        this.api.alterar(this.ordemSelecionada.os_id,this.obj).subscribe(
          
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Item editado com sucesso." });

            if(this.ordemSelecionada.os_status == 'concluido' || this.ordemSelecionada.os_status == 'cancelado' || this.ordemSelecionada.os_status == 'aguardando peças'|| this.ordemSelecionada.os_status == 'em manutenção')
             {
             
              this.adicionarHistorico(result, 'A');
            }
    
            this.consultar();
            this.displaySaveDialog = false;
            
          }
          
        )
      }
    })
  
  }


  excluir(){
    if(this.ordemSelecionada == null || this.ordemSelecionada.os_id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
      return;
    }
    this.confirmService.confirm({
      message: "Esta seguro que deseja excluir esse Registro?",
      accept : () =>{
        this.api.excluir(this.ordemSelecionada.os_id).subscribe(
          
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Item eliminado corretamente." });
            this.consultar();
            
          }
          
        )
      }
    })
  
  }

  consultarHistoricoOrdem(){
    this.apiHistorico.consultarHistoricoOrdem(this.ordemSelecionada.os_id)

    .toPromise()
    .then
    (res => {
      this.listaHistorico = res;
      console.log("Lista criada:"+ (this.listaHistorico))
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
    this.consultar();
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

// cliente
consultarCliente() {
  this.apiPessoa.consultar()
  .toPromise()
  .then
  (res => {
    this.listaCli = res;
  
  });
} 


atribuirCliente(id) {
  this.obj.pessoaCli.id = id;
  console.log(`Pessoa: ${this.obj.pessoaCli.id}`);
}
// ^^ Cliente

// funcionario
consultarFuncionario() {
  this.apiPessoa.consultar()
  .toPromise()
  .then
  (res => {
    this.listaFun= res;
  });
} 



atribuirFuncionario(id) {
  this.obj.pessoaFun.id = id;
  console.log(`Pessoa: ${this.obj.pessoaFun.id}`);
}
// ^^ Funcionario

  ngOnInit():void{
    this.consultar();
    this.consultarCliente();
    this.consultarFuncionario();
    this.consultarLaboratorio();
    this.consultarTipoServico();
    this.cols = [
      { field: "os_id", header: "Processo" },
     // { field: "os_data_emisao", header: "Data Inicio" },
      //{ field: "os_data_fechamento", header: "Data fechamento" },
      //{ field: "os_descricao", header: "Descrição" },
      //{ field: "os_local", header: "local" },
     // { field: "tipoServico", header: "Tipo servico" },
     // { field: "laboratorioSala", header: "Laboratorio" },
     // { field: "pessoaFun", header: "Funcionario" },
    //  { field: "pessoaCli", header: "Cliente" }

  
    ];

    this.status = [];
        this.status.push({label:'Selecione um status', value:''});
        this.status.push({label:'Aberta', value:'aberto'});
        this.status.push({label:'Concluido', value:'concluido'});
        this.status.push({label:'Cancelada', value:'cancelado'});
        this.status.push({label:'Aguardando peças', value:'aguardando peças'});
        this.status.push({label:'Em manutenção', value:'em manutenção'});

    this.items = [
      {
        label: "Adicionar",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => this.showSaveDialog(true)
      },
      {
        label: "Eliminar", 
        icon: "pi pi-fw pi-times",
        command: () => this.excluir()
      },
      {
        
          label: "Historico",
          icon: 'pi pi-fw pi-check',
          command: () =>this.showDialog(true)
          
      }
    ]

  }

}
