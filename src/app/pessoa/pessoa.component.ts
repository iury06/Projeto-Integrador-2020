import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa.model';
import { MenuItem, MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { PessoaService } from '../service/pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  displaySaveDialog: boolean = false;

itemPerfil: SelectItem[];
  lista : Pessoa[] = []; 
  obj: Pessoa = new Pessoa();
  pessoa = '';

 

  pessoaSelecionada: Pessoa = {
    id: null,
    nome: null,
    pes_cpf_cnpj: null,
    pes_telefone: null,
    pes_email: null,
    pes_funcao: null,
    pes_login: null,
    pes_senha: null,
    pes_perfil: null

  };

  constructor(private api: PessoaService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  
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
      if (this.pessoaSelecionada != null && this.pessoaSelecionada.id != null) {
        this.obj = this.pessoaSelecionada;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
        return;
      }
    } else {
      this.obj = new Pessoa();
    }
    this.displaySaveDialog = true;
  }

  adicionar() {
    if(this.obj.nome == null|| this.obj.pes_cpf_cnpj == null || this.obj.pes_email == null || this.obj.pes_login == null || this.obj.pes_perfil == null
      || this.obj.pes_senha == null|| this.obj.pes_telefone == null ){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Campos obrigatorio, prencha o formulario!"});
        return;
    }

    this.api.adicionar(this.obj).subscribe(
      (result: any) => {
        let obj = result as Pessoa;
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Usuario adicionado com sucesso!" });
        this.displaySaveDialog = false;
        this.consultar();
      },
      error => {
        console.log(error);
      }
    );
  }

  alterar(){
    if(this.pessoaSelecionada == null || this.pessoaSelecionada.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor selecione um registro"});
      return;
    }
    
    this.confirmService.confirm({
      message: "Esta seguro, deseja editar esse Registro?",
      accept : () =>{
        this.api.alterar(this.pessoaSelecionada.id,this.obj).subscribe(
          
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Usuario editado com sucesso!" });
            this.consultar();
            this.displaySaveDialog = false;
            
          }
          
        )
      }
    })
  
  }


  excluir(){
    if(this.pessoaSelecionada == null || this.pessoaSelecionada.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione um registro"});
      return;
    }
    this.confirmService.confirm({
      message: "Esta seguro que deseja excluir esse Registro?",
      accept : () =>{
        this.api.excluir(this.pessoaSelecionada.id).subscribe(
          
          (result:any) =>{
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Usuario excluido com sucesso!." });
            this.consultar();
            
          }
          
        )
      }
    })
  
  }



  ngOnInit():void{
    this.consultar();
    this.cols = [
      { field: "id", header: "Codigo usuario" },
      { field: "nome", header: "Nome" },
      { field: "pes_perfil", header: "Perfil" },
      { field: "pes_telefone", header: "Telefone" },
      { field: "pes_email", header: "Email" },
      { field: "pes_funcao", header: "Função" },
      
    ];

    this.itemPerfil = [];
    this.itemPerfil.push({label:'Selecione um perfil', value:''});
    this.itemPerfil.push({label:'Cliente', value:'cliente'});
    this.itemPerfil.push({label:'Funcionario', value:'funcionario'});
    this.itemPerfil.push({label:'Adiministrador', value:'administrador'});
   

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
