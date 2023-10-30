import { Injectable } from '@angular/core';
import { Venda } from './venda.model';
import { EstoqueService } from './estoque.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  vendas: Venda[] = [];
  private nextVendaId: number = 1;
  vendaEditada = new Subject<Venda>();

  constructor(private estoqueService: EstoqueService) {
    const vendasString = localStorage.getItem('vendas');
    if (vendasString) {
      this.vendas = JSON.parse(vendasString);
    }
  }

  registrarVenda(venda: Venda) {
    console.log('Tentando registrar venda:', venda);
    venda.id = this.getNextVendaId();

    if (venda.itemId === undefined) {
      console.error('ID do item de estoque não definido');
      return;
    }

    // Registre a venda
    this.vendas.push(venda);

    // Atualize o estoque
    const itemEstoque = this.estoqueService.obterItemPorId(venda.itemId);
    if (itemEstoque && typeof itemEstoque.id === 'number') {
      if (itemEstoque.quantidade >= venda.quantidade) {
        itemEstoque.quantidade -= venda.quantidade;
        this.estoqueService.atualizarEstoqueItem(itemEstoque.id, itemEstoque.quantidade);
      } else {
        console.error('A quantidade de estoque é insuficiente para a venda.');
      }
    } else {
      console.error(`Item de estoque não encontrado para venda com ID ${venda.itemId}`);
    }

    // Atualize o localStorage
    localStorage.setItem('vendas', JSON.stringify(this.vendas));
  }

  private getNextVendaId(): number {
    // Incrementa o contador e retorna o próximo ID de venda
    return this.nextVendaId++;
  }

  excluirVenda(venda: Venda) {
    const index = this.vendas.indexOf(venda);
    if (index !== -1) {
      // Restaurar a quantidade no estoque
      const itemEstoque = this.estoqueService.obterItemPorId(venda.itemId);
      if (itemEstoque) {
        itemEstoque.quantidade += venda.quantidade;
        this.estoqueService.atualizarEstoqueItem(venda.itemId, itemEstoque.quantidade);
      }
      // Excluir a venda
      this.vendas.splice(index, 1);
      // Atualizar o localStorage
      localStorage.setItem('vendas', JSON.stringify(this.vendas));
    }
  }

  excluirTodasAsVendas() {
    this.vendas = [];
    // Limpe o localStorage
    localStorage.removeItem('vendas');
  }

  obterVendas(): Venda[] {
    return this.vendas;
  }

  // editarVenda(venda: Venda) {
  //   const index = this.vendas.findIndex((v) => v.itemId === venda.itemId);
  //   if (index !== -1) {
  //     this.vendas[index] = venda;
  //     localStorage.setItem('vendas', JSON.stringify(this.vendas));
  //   }
  // }

  editarVenda(venda: Venda) {
    const index = this.vendas.findIndex((v) => v.itemId === venda.itemId);
    if (index !== -1) {
      this.vendas[index] = venda;
      localStorage.setItem('vendas', JSON.stringify(this.vendas));
      this.vendaEditada.next(venda); // Emita o evento de venda editada
    }
  }

  atualizarVendaItem(id: number, quantidade: number) {
    const item = this.obterVendaPorId(id);
    if (item) {
      item.quantidade = quantidade;
      this.salvarVenda();
    }
  }

  private salvarVenda() {
    localStorage.setItem('vendas', JSON.stringify(this.vendas));
  }

  obterVendaPorId(vendaId: number): Venda | undefined {
    return this.vendas.find((venda) => venda.itemId === vendaId);
  }

  obterVendasPorItemId(itemId: number): Venda[] {
    return this.vendas.filter((venda) => venda.itemId === itemId);
  }
}
