import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/estoque.service';
import { Estoque } from 'src/app/estoque.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-estoque',
  templateUrl: './consulta-estoque.component.html',
  styleUrls: ['./consulta-estoque.component.css'],
})
export class ConsultaEstoqueComponent implements OnInit {
  estoqueItens: Estoque[] = [];
  valorTotalCusto: number = 0;

  constructor(private estoqueService: EstoqueService, private router: Router) {
    // Não calcule o valorTotalCusto aqui, pois estoqueItens ainda não está carregado.
  }
  
  ngOnInit() {
    this.estoqueItens = this.estoqueService.obterEstoque();
    this.calcularValorTotalCusto(); // Agora, você pode calcular o valor após carregar os itens.
  }

  calcularValorTotalCusto() {
    this.valorTotalCusto = this.calcularValoresTotais();
  }

  calcularValoresTotais(): number {
    let total = 0;

    this.estoqueItens.forEach((estoque) => {
      total += this.calcularValorTotal(estoque);
    });

    return total;
  }

  editarItem(item: Estoque) {
    console.log('Editar item chamado'); // Adicione esta linha
    if (item.id) {
      this.router.navigate(['/editar-estoque', item.id]);
    }
  }

  calcularValorTotalVendas(): number {
    let total = 0;

    this.estoqueItens.forEach((item) => {
      total += item.quantidade * item.precocompra;
    });

    return total;
  }

  calcularValorTotal(item: Estoque): number {
    if (item.id && item.quantidade) {
      return item.quantidade * item.precocompra;
    }
    return 0;
  }

  excluirItem(item: Estoque) {
    const confirmarExclusao = confirm(
      'Tem certeza que deseja excluir este item?'
    );
    if (confirmarExclusao) {
      this.estoqueService.excluirEstoque(item);
      this.estoqueItens = this.estoqueService.obterEstoque();
    }
  }

  excluirTodosItens() {
    const confirmarExclusaoTodos = confirm(
      'Tem certeza que deseja excluir todos os itens do estoque?'
    );
    if (confirmarExclusaoTodos) {
      this.estoqueService.excluirTodosEstoque();
      this.estoqueItens = this.estoqueService.obterEstoque();
    }
  }

  formatarDinheiro(valor: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(valor);
  }
}
