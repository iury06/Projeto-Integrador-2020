import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { LaboratorioSala } from '../model/laboratorio-sala.model';
import { LaboratorioSalaService } from '../service/laboratorio-sala.service';

@Component({
  selector: 'app-laboratorio-sala',
  templateUrl: './laboratorio-sala.component.html',
  styleUrls: ['./laboratorio-sala.component.css']
})
export class LaboratorioSalaComponent implements OnInit {

  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;


  lista : LaboratorioSala[] = []; 
  obj: LaboratorioSala = new LaboratorioSala();
  laboratorio = '';

 

  laboratorioSelecionado: LaboratorioSala = {
    id: null,
    nome: null,
  };

  constructor(private api: LaboratorioSalaService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  
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
      if (this.laboratorioSelecionado != null && this.laboratorioSelecionado.id != null) {
        this.obj = this.laboratorioSelecionado;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
        return;
      }
    } else {
      this.obj = new LaboratorioSala();
    }
    this.displaySaveDialog = true;
  }

  adicionar() {

    if(this.obj.nome == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Nome so laboratorio obrigatorio!"});
      return;
    }
    this.api.adicionar(this.obj).subscribe(
      (result: any) => {
        let obj = result as LaboratorioSala;
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Laboratorio adicionado com sucesso!" });
        this.displaySaveDialog = false;
        this.consultar();
      },
      error => {
        console.log(error);
      }
    );
  }

  alterar(){
    if(this.laboratorioSelecionado == null || this.laboratorioSelecionado.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
      return;
    }
    
    this.confirmService.confirm({
      message: "Esta seguro, deseja editar esse Registro?",
      accept : () =>{
        this.api.alterar(this.laboratorioSelecionado.id,this.obj).subscribe(
          
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
    if(this.laboratorioSelecionado == null || this.laboratorioSelecionado.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
      return;
    }
    this.confirmService.confirm({
      message: "Esta seguro que deseja excluir esse Registro?",
      accept : () =>{
        this.api.excluir(this.laboratorioSelecionado.id).subscribe(
          
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
      { field: "nome", header: "Descricao" },
     
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

