// consulta-estoque.component.ts
import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/estoque.service';
import { Estoque } from 'src/app/estoque.model';

@Component({
  selector: 'app-consulta-estoque',
  templateUrl: './consulta-estoque.component.html',
  styleUrls: ['./consulta-estoque.component.css'],
})
export class ConsultaEstoqueComponent implements OnInit {
  pesquisa: string = '';
  resultados: Estoque[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.resultados = this.estoqueService.obterEstoque().filter(item => {
      return item.nome.toLowerCase().includes(this.pesquisa.toLowerCase());
    });
  }
}
