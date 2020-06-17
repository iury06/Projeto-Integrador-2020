import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';
import { MessageService} from 'primeng/api';
import { Pessoa } from '../model/pessoa.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-pessoa-cliente',
  templateUrl: './pessoa-cliente.component.html',
  styleUrls: ['./pessoa-cliente.component.css'],

})
export class PessoaClienteComponent implements OnInit {
  displaySaveDialog: boolean = true;

  obj: Pessoa = new Pessoa();


  constructor(private api: PessoaService, private messageService: MessageService, private router: Router, private fb: FormBuilder) { }


  ngOnInit(): void {
    
  }
  
  
  adicionar() {
    this.obj.pes_perfil ="cliente";
    this.api.adicionar(this.obj).subscribe(
      (result: any) => {
        let obj = result as Pessoa;
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Cadastrado realizado com sucesso!" });

        this.router.navigate(['/login'])
      
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/login'])
}


}


