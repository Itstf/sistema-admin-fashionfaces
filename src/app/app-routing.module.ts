import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroEstoqueComponent } from './pages/cadastro-estoque/cadastro-estoque.component';
import { ConsultaEstoqueComponent } from './pages/consulta-estoque/consulta-estoque.component';
import { EditarEstoqueComponent } from './editar-estoque/editar-estoque.component';
import { CadastroVendasComponent } from './pages/cadastro-vendas/cadastro-vendas.component';
import { ConsultaVendasComponent } from './pages/consulta-vendas/consulta-vendas.component';
import { EditarConsultavendasComponent } from './editar-consultavendas/editar-consultavendas.component';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "cadastro_estoque", component: CadastroEstoqueComponent
  },
  {
    path: "consulta_estoque", component: ConsultaEstoqueComponent
  },
  {
    path: "editar-estoque/:id", component: EditarEstoqueComponent
  },
  {
    path: "cadastro_vendas", component: CadastroVendasComponent
  },
  {
    path: "consulta_vendas", component: ConsultaVendasComponent
  },
  {
    path: "editar-consultavendas/:id", component: EditarConsultavendasComponent
  },
  {
    path: "fornecedores", component: FornecedoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }