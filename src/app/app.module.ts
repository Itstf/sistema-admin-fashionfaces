import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroEstoqueComponent } from './pages/cadastro-estoque/cadastro-estoque.component';
import { ConsultaEstoqueComponent } from './pages/consulta-estoque/consulta-estoque.component';
import { EditarEstoqueComponent } from './editar-estoque/editar-estoque.component';
import { CadastroVendasComponent } from './pages/cadastro-vendas/cadastro-vendas.component';
import { ConsultaVendasComponent } from './pages/consulta-vendas/consulta-vendas.component';
import { VendasService } from './vendas.service';
import { NavigationComponent } from './navigation/navigation.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarConsultavendasComponent } from './editar-consultavendas/editar-consultavendas.component';
import { CpfFormatPipe } from './cpf-format.pipe';
import { TelefoneFormatPipe } from './telefone-format.pipe';
import { ValoresTotaisComponent } from './pages/valores-totais/valores-totais.component';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CadastroEstoqueComponent,
    ConsultaEstoqueComponent,
    EditarEstoqueComponent,
    CadastroVendasComponent,
    ConsultaVendasComponent,
    ConsultaVendasComponent,
    NavigationComponent,
    LogoutComponent,
    EditarConsultavendasComponent,
    CpfFormatPipe,
    TelefoneFormatPipe,
    ValoresTotaisComponent,
    FornecedoresComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Adicione o FormsModule aos imports
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [VendasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
