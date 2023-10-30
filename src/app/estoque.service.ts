import { Injectable } from '@angular/core';
import { Estoque } from './estoque.model';
import { Fornecedor } from './fornecedor.model';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  estoqueItens: Estoque[] = [];
  private nextItemId: number = 1;
  fornecedores: Fornecedor[] = [];

  constructor() {
    const storedData = localStorage.getItem('estoqueItens');
    if (storedData) {
      this.estoqueItens = JSON.parse(storedData);
    }
  
    this.carregarFornecedores();

    const storedFornecedores = localStorage.getItem('fornecedores');
    if (storedFornecedores) {
      this.fornecedores = JSON.parse(storedFornecedores);
    }
}


  adicionarFornecedor(fornecedor: Fornecedor) {
    this.fornecedores.push(fornecedor);
    this.salvarFornecedores();
  }

  excluirFornecedor(fornecedor: Fornecedor) {
    const index = this.fornecedores.indexOf(fornecedor);
    if (index !== -1) {
      this.fornecedores.splice(index, 1);
      this.salvarFornecedores();
    }
  }
  
  

  salvarFornecedores() {
    localStorage.setItem('fornecedores', JSON.stringify(this.fornecedores));
  }
  
  

  carregarFornecedores() {
    const fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
      this.fornecedores = JSON.parse(fornecedoresData);
    }
  }


  
  obterEstoque() {
    return this.estoqueItens;
  }

  obterFornecedores(): Fornecedor[] {
    const fornecedores: Fornecedor[] = [];

    for (const item of this.estoqueItens) {
      if (!fornecedores.find(fornecedor => fornecedor.nome === item.fornecedor)) {
        fornecedores.push({ id: 0, nome: item.fornecedor });
      }
    }

    return fornecedores;
  }

  obterItemPorId(id: number): Estoque | undefined {
    return this.estoqueItens.find((item) => item.id === id);
  }

  adicionarEstoque(item: Estoque) {
    item.id = this.getNextItemId();
    this.estoqueItens.push(item);
    this.salvarEstoque();
  }

  excluirEstoque(item: Estoque) {
    const index = this.estoqueItens.indexOf(item);
    if (index !== -1) {
      this.estoqueItens.splice(index, 1);
      this.salvarEstoque();
    }
  }

  excluirTodosEstoque() {
    this.estoqueItens = [];
    this.salvarEstoque();
  }

  atualizarEstoqueItem(id: number, quantidade: number) {
    const item = this.obterItemPorId(id);
    if (item) {
      item.quantidade = quantidade;
      this.salvarEstoque();
    }
  }

  atualizarQuantidadeEstoque(itemId: number, quantidadeVendida: number) {
    const item = this.obterItemPorId(itemId);
    if (item) {
      item.quantidade += quantidadeVendida;
      this.salvarEstoque();
    }
  }

  private salvarEstoque() {
    localStorage.setItem('estoqueItens', JSON.stringify(this.estoqueItens));
  }

  private getNextItemId(): number {
    return this.nextItemId++;
  }
}
