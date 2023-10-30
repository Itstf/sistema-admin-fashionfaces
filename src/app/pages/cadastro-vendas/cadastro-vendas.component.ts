import { Component } from '@angular/core';
import { EstoqueService } from 'src/app/estoque.service';
import { Estoque } from 'src/app/estoque.model';
import { VendasService } from 'src/app/vendas.service';
import { Venda } from 'src/app/venda.model';

@Component({
  selector: 'app-cadastro-vendas',
  templateUrl: './cadastro-vendas.component.html',
  styleUrls: ['./cadastro-vendas.component.css'],
})
export class CadastroVendasComponent {
  selectedEstoqueItem: Estoque | null = null;
  clienteNome: string = '';
  formaPagamento: string = '';
  cpf: string = '';
  contato: string = '';
  quantidade: number = 1;

  valorTotal: number = 0;

  constructor(public estoqueService: EstoqueService, private vendasService: VendasService) {}

  get itensEstoque(): Estoque[] {
    return this.estoqueService.obterEstoque();
  }

  onEstoqueItemSelectionChange() {
    if (this.selectedEstoqueItem) {
      this.updateValorTotal();
    }
  }

  updateValorTotal() {
    if (this.selectedEstoqueItem) {
      this.valorTotal = this.quantidade * this.selectedEstoqueItem.preco;
    }
  }

  onSubmit() {
    if (!this.selectedEstoqueItem) {
      alert('Selecione um item do estoque.');
      return;
    }

    if (this.selectedEstoqueItem.id === undefined) {
      alert('ID do item do estoque não encontrado.');
      return;
    }

    const estoqueItem = this.estoqueService.obterItemPorId(this.selectedEstoqueItem.id);

    if (!estoqueItem) {
      alert('Item do estoque não encontrado.');
      return;
    }

    if (this.quantidade > estoqueItem.quantidade) {
      alert('A quantidade selecionada excede o estoque disponível.');
      return;
    }

    if (!this.validateTelefone(this.contato)) {
      alert('Número de telefone incorreto. Deve conter exatamente 11 dígitos.');
      return;
    }

    if (!this.validateCpf(this.cpf)) {
      alert('CPF incorreto. Use o formato XXX.XXX.XXX-XX.');
      return;
    }

    const novaVenda: Venda = {
      // adicionar ID para as vendas
      itemId: this.selectedEstoqueItem.id,
      nomeItem: this.selectedEstoqueItem.nome,
      clienteNome: this.clienteNome,
      formaPagamento: this.formaPagamento,
      cpf: this.formatarCpf(this.cpf),
      contato: this.formatarTelefone(this.contato),
      quantidade: this.quantidade,
      valorTotal: this.valorTotal,
      dataVenda: new Date(),
      itemEstoque: this.selectedEstoqueItem,
    };

    this.vendasService.registrarVenda(novaVenda);

    this.selectedEstoqueItem = null;
    this.clienteNome = '';
    this.formaPagamento = '';
    this.cpf = '';
    this.contato = '';
    this.quantidade = 1;
    this.valorTotal = 0;
  }

  validateTelefone(contato: string): boolean {
    return /^\d{11}$/.test(contato);
  }

  validateCpf(cpf: string): boolean {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }

  formatarCpf(cpf: string): string {
    if (!cpf) return '';

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';

    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
