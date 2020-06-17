import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }
  
  items: MenuItem[];
  ngOnInit() {
    this.items = [
      
      {label: 'Pedidos', icon: 'pi pi-fw pi-id-card', command: () => this.router.navigate(['/ordemServico']) },

      {label: 'Historicos', icon: 'pi pi-fw pi-table', command: () => this.router.navigate(['/historico'])},
      
    {label: 'Cadastros', icon: 'pi pi-fw pi-pencil',
      items: [
          {label: 'Pessoas', icon:'pi pi-fw pi-users', command: () => this.router.navigate(['/pessoa'])},
          {separator:true},

        {label: 'Tipo serviços', icon:'pi pi-fw pi-plus', command: () => this.router.navigate(['/tipoServico'])},
        {separator:true},

      {label: 'Laboratorios', icon:'pi pi-fw pi-sitemap',command: () => this.router.navigate(['/laboratorioSala']) }
      
      ]
  },
      {
        label: 'Relatorios', icon: 'pi pi-fw pi-chart-bar',
        items: [
            {label: 'Pedidos' ,command: () => this.router.navigate(['/relatorio']) },
            {separator:true},
            {label: 'Outros'}
        ]
    },
    {label: 'Login', icon: 'pi pi-fw pi-user', command: () => this.router.navigate(['/login'])},
  ];
}
  
  }

