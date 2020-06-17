import { Component, OnInit } from '@angular/core';
import { TipoServico } from '../model/tipo-servico.model';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { TipoServicoService } from '../service/tipo-servico.service';

@Component({
  selector: 'app-tipo-servico',
  templateUrl: './tipo-servico.component.html',
  styleUrls: ['./tipo-servico.component.css']
})
export class TipoServicoComponent implements OnInit {

  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;


  lista : TipoServico[] = []; 
  obj: TipoServico = new TipoServico();
  tipoServico = '';

 

  tipoServicoSelecionado: TipoServico = {
    id: null,
    descricao: null,
  };

  constructor(private api: TipoServicoService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  
  consultar(){
    this.api.consultar()
    .toPromise()
    .then
    (res => {
      this.lista = res;
    });
  }

  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.tipoServicoSelecionado != null && this.tipoServicoSelecionado.id != null) {
        this.obj = this.tipoServicoSelecionado;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
        return;
      }
    } else {
      this.obj = new TipoServico();
    }
    this.displaySaveDialog = true;
  }

  adicionar() {
    if(this.obj.descricao == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Campo obrigatorio!"});
        return;
    }
    this.api.adicionar(this.obj).subscribe(
      (result: any) => {
        let obj = result as TipoServico;
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Item adicionado com sucesso!" });
        this.displaySaveDialog = false;
        this.consultar();
      },
      error => {
        console.log(error);
      }
    );
  }

  alterar(){
    if(this.tipoServicoSelecionado == null || this.tipoServicoSelecionado.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
      return;
    }
    
    this.confirmService.confirm({
      message: "Esta seguro, deseja editar esse Registro?",
      accept : () =>{
        this.api.alterar(this.tipoServicoSelecionado.id,this.obj).subscribe(
          
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Item editado com sucesso." });
            this.consultar();
            this.displaySaveDialog = false;
            
          }
          
        )
      }
    })
  
  }


  excluir(){
    if(this.tipoServicoSelecionado == null || this.tipoServicoSelecionado.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
      return;
    }
    this.confirmService.confirm({
      message: "Esta seguro que deseja excluir esse Registro?",
      accept : () =>{
        this.api.excluir(this.tipoServicoSelecionado.id).subscribe(
          
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Item eliminado corretamente." });
            this.consultar();
            
          }
          
        )
      }
    })
  
  }



  ngOnInit():void{
    this.consultar();
    this.cols = [
      { field: "id", header: "Codigo" },
      { field: "descricao", header: "Descricao" },
     
    ];



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
      }
    ]

  }

}
