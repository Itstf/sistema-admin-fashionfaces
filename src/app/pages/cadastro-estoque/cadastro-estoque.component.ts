import { Component } from '@angular/core';
import Swal from 'sweetalert2'; 

import { EstoqueService } from 'src/app/estoque.service';
import { Estoque } from 'src/app/estoque.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-estoque',
  templateUrl: './cadastro-estoque.component.html',
  styleUrls: ['./cadastro-estoque.component.css'],
})
export class CadastroEstoqueComponent {
  // Propriedades do formulário
  nome: string = '';
  descricao: string = '';
  tamanho: string = '';
  fornecedor: string = '';
  quantidade: number = 0;
  preco: number = 0;
  precocompra: number = 0;

  constructor(private estoqueService: EstoqueService) {}

  onSubmit(cadastroForm: NgForm) {
    // Verifique se todos os campos estão preenchidos
    if (!this.nome || !this.descricao || !this.tamanho || !this.fornecedor || !this.quantidade || !this.preco) {
      Swal.fire('Por favor, preencha todos os campos corretamente.', '', 'error');
      return;
    }

    // Obtenha os valores do formulário e crie um novo objeto Estoque
    const novoItem: Estoque = {
      nome: this.nome,
      descricao: this.descricao,
      tamanho: this.tamanho,
      fornecedor: this.fornecedor,
      quantidade: this.quantidade,
      preco: this.preco,
      precocompra: this.precocompra,
    };

    // Adicione o novo item ao serviço
    this.estoqueService.adicionarEstoque(novoItem);

    // Exiba um SweetAlert de sucesso
    Swal.fire('Cadastro realizado com sucesso!', '', 'success');

    // Limpe o formulário
    cadastroForm.resetForm();
  }
}
