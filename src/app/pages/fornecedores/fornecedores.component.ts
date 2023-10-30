import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/estoque.service';
import { Fornecedor } from 'src/app/fornecedor.model';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css'],
})
export class FornecedoresComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  novoFornecedor: string = '';

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit() {
    this.estoqueService.carregarFornecedores(); // Carregar fornecedores ao inicializar
    this.fornecedores = this.estoqueService.obterFornecedores();
  }
  

  adicionarFornecedor() {
    if (this.novoFornecedor) {
      const novoFornecedor: Fornecedor = {
        id: this.getNextFornecedorId(),
        nome: this.novoFornecedor,
        // Outras propriedades do fornecedor
      };
      this.fornecedores.push(novoFornecedor);
      this.estoqueService.adicionarFornecedor(novoFornecedor);
      this.novoFornecedor = '';
    }
  }

  excluirFornecedor(fornecedor: Fornecedor) {
    const confirmarExclusao = confirm(`Tem certeza que deseja excluir o fornecedor "${fornecedor.nome}"?`);
    if (confirmarExclusao) {
      const index = this.fornecedores.indexOf(fornecedor);
      if (index !== -1) {
        this.fornecedores.splice(index, 1);
        this.estoqueService.excluirFornecedor(fornecedor);
      }
    }
  }

  private getNextFornecedorId(): number {
    const maxId = Math.max(...this.fornecedores.map(fornecedor => fornecedor.id), 0);
    return maxId + 1;
  }
}
