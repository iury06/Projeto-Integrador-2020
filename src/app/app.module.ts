import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { PessoaComponent } from './pessoa/pessoa.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { HistoricoComponent } from './historico/historico.component';
import { TipoServicoComponent } from './tipo-servico/tipo-servico.component';
import { LaboratorioSalaComponent } from './laboratorio-sala/laboratorio-sala.component';
import { LoginComponent } from './login/login.component';
import {ChartModule} from 'primeng/chart';
import { AuthGuard } from './guards/auth.guard';

import {ListboxModule} from 'primeng/listbox';
import {PasswordModule} from 'primeng/password';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputMaskModule} from 'primeng/inputmask';
import {DataViewModule} from 'primeng/dataview';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/home.component';
import { PessoaClienteComponent } from './pessoa-cliente/pessoa-cliente.component';
import { OrdemClienteComponent } from './ordem-cliente/ordem-cliente.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {DropdownModule} from 'primeng/dropdown';
import {OrderListModule} from 'primeng/orderlist';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { RelatoriosComponent } from './relatorios/relatorios.component';
@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    OrdemServicoComponent,
    HistoricoComponent,
    TipoServicoComponent,
    LaboratorioSalaComponent,
    LoginComponent,
    HomeComponent,
    PessoaClienteComponent,
    OrdemClienteComponent,
    RelatoriosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    PanelModule,
    MenubarModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    ChartModule,
    ListboxModule,
    PasswordModule,
    ColorPickerModule,
    DataViewModule,
    InputMaskModule,
    TabMenuModule,
    TabViewModule,
    CodeHighlighterModule,
    DropdownModule,
    OrderListModule,
    InputTextareaModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    LoginService,
    AuthGuard,
    InputMaskModule,
    LoginService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }