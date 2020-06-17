import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricoComponent } from './historico/historico.component';
import { LaboratorioSalaComponent } from './laboratorio-sala/laboratorio-sala.component';
import { TipoServicoComponent } from './tipo-servico/tipo-servico.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PessoaClienteComponent } from './pessoa-cliente/pessoa-cliente.component';
import { OrdemClienteComponent } from './ordem-cliente/ordem-cliente.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';


const routes: Routes = [
  { path: '', component: Component, canActivate:[AuthGuard]},

  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},

   {path: 'historico', component: HistoricoComponent, canActivate:[AuthGuard]},

   {path: 'laboratorioSala', component: LaboratorioSalaComponent, canActivate:[AuthGuard]},
   
   {path: 'tipoServico', component: TipoServicoComponent, canActivate:[AuthGuard]},
  
   {path: 'pessoa', component: PessoaComponent, canActivate:[AuthGuard]},
  
   {path: 'ordemServico', component: OrdemServicoComponent, canActivate:[AuthGuard]},
   
   {path: 'login', component: LoginComponent},

   {path: 'cadastro', component: PessoaClienteComponent},

   {path: 'ordemCliente', component: OrdemClienteComponent, canActivate:[AuthGuard]},

   {path: 'relatorio', component: RelatoriosComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
