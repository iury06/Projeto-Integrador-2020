import { Component, OnInit, EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import {MessageService,} from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  objUser: Usuario = new Usuario();
    constructor(private apiLogin: LoginService, private router: Router, private messageService: MessageService) { }
  
   
    fazerLogin(){
     // console.log(this.objUser);
     if(this.objUser.login == null  || this.objUser.senha == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "senha ou usuario invalidos!"});
      return;
     }
      this.apiLogin.consultarUsuario(this.objUser).toPromise()
      .then(Login => {
        var array = Login[0];

        if(array == undefined){
          this.apiLogin.usuarioAutenticado = false;
          //this.messageService.
        }else{
          var data = array[2];
           console.log("perfil usuario:" +data);
        }
        if(data == 'funcionario' || data == 'administrador'){
  
          this.apiLogin.usuarioAutenticado = true;
  
          this.router.navigate(['/ordemServico']);
          this.objUser = new Usuario();

        }else if(data == 'cliente'){
          this.apiLogin.usuarioAutenticado = true;
          this.objUser = new Usuario();
          this.router.navigate(['/ordemCliente'])

        }

        
      })
  
    }
    ngOnInit() {
      this.objUser = new Usuario();
    }
}