import { Component, OnInit, OnDestroy } from '@angular/core';
import { EstoqueService } from 'src/app/estoque.service';
import { Venda } from 'src/app/venda.model';
import { VendasService } from 'src/app/vendas.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consulta-vendas',
  templateUrl: './consulta-vendas.component.html',
  styleUrls: ['./consulta-vendas.component.css'],
})
export class ConsultaVendasComponent implements OnInit, OnDestroy {
  vendas: Venda[] = [];
  itensEstoque: any[] = [];
  valorTotalVendas: number = 0;

  private vendaEditadaSubscription: Subscription;

  constructor(
    private vendasService: VendasService,
    private estoqueService: EstoqueService,
    private router: Router
  ) {
    this.vendaEditadaSubscription = this.vendasService.vendaEditada.subscribe((venda) => {
      this.atualizarVendaNaLista(venda);
      this.calcularValorTotalVendas();
    });
  }

  ngOnInit() {
    this.vendas = this.vendasService.obterVendas();
    this.itensEstoque = this.estoqueService.obterEstoque();
    this.calcularValorTotalVendas();
  }

  salvarEdicao(venda: Venda) {
    this.vendasService.editarVenda(venda);
    this.router.navigate(['/consulta_vendas']);
  }

  atualizarVendaNaLista(venda: Venda) {
    const index = this.vendas.findIndex((v) => v.itemId === venda.itemId);
    if (index !== -1) {
      this.vendas[index] = venda;
    }
  }

  ngOnDestroy() {
    this.vendaEditadaSubscription.unsubscribe();
  }

  calcularQuantidadeDisponivel(itemId: number): number {
    const vendasItem = this.vendasService.obterVendasPorItemId(itemId);
    const estoqueItem = this.estoqueService.obterItemPorId(itemId);

    if (estoqueItem) {
      let quantidadeDisponivel = estoqueItem.quantidade;

      if (vendasItem) {
        quantidadeDisponivel -= vendasItem.reduce((total, venda) => total + venda.quantidade, 0);
      }

      return quantidadeDisponivel;
    }

    return 0;
  }

  calcularValorTotalVendas() {
    this.valorTotalVendas = this.calcularValoresTotais();
  }

  calcularValorTotal(item: Venda): number {
    if (item.itemId && item.quantidade) {
      return item.quantidade * item.itemEstoque.preco;
    }
    return 0;
  }

  calcularValoresTotais(): number {
    let total = 0;

    this.vendas.forEach((venda) => {
      total += this.calcularValorTotal(venda);
    });

    return total;
  }

  formatarDinheiro(valor: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(valor);
  }

  navegarParaEdicao(venda: Venda) {
    this.router.navigate(['/editar-consultavendas', venda.id, { venda: JSON.stringify(venda) }]);
  }
  

  // navegarParaEdicao(venda: Venda) {
  //   this.router.navigate(['/editar-consultavendas', venda.id]);
  // }

  excluirVenda(venda: Venda) {
    this.vendasService.excluirVenda(venda);
    this.vendas = this.vendasService.obterVendas();
    this.calcularValorTotalVendas();
    this.atualizarQuantidadeEstoque(venda.itemId, venda.quantidade);
  }

  excluirTodasAsVendas() {
    this.vendasService.excluirTodasAsVendas();
    this.vendas = this.vendasService.obterVendas();
    this.calcularValorTotalVendas();
    this.atualizarQuantidadeEstoqueParaTodasVendas();
  }

  editarVenda(venda: Venda) {
    const index = this.vendas.findIndex((v) => v.itemId === venda.itemId);
    if (index !== -1) {
      // Salve a quantidade original
      const quantidadeOriginal = this.vendas[index].quantidade;

      this.vendas[index] = venda;
      this.vendasService.editarVenda(venda);
      this.calcularValorTotalVendas();

      // Calcule a diferença entre a quantidade original e a nova quantidade
      const diferencaQuantidade = quantidadeOriginal - venda.quantidade;
      this.atualizarQuantidadeEstoque(venda.itemId, diferencaQuantidade);
    }
  }

  atualizarQuantidadeEstoque(itemId: number, quantidadeVendida: number) {
    const itemEstoque = this.itensEstoque.find((item) => item.id === itemId);
    if (itemEstoque) {
      itemEstoque.quantidade += quantidadeVendida;
      this.estoqueService.atualizarEstoqueItem(itemEstoque.id, itemEstoque.quantidade);
    }
  }

  atualizarQuantidadeEstoqueParaTodasVendas() {
    for (const venda of this.vendas) {
      this.atualizarQuantidadeEstoque(venda.itemId, venda.quantidade);
    }
  }
}
