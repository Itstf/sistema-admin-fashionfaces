import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda } from '../venda.model';
import { VendasService } from '../vendas.service';

@Component({
  selector: 'app-editar-consultavendas',
  templateUrl: './editar-consultavendas.component.html',
  styleUrls: ['./editar-consultavendas.component.css'],
})

export class EditarConsultavendasComponent implements OnInit {
  venda: Venda = {
    itemId: 0,
    nomeItem: '',
    clienteNome: '',
    formaPagamento: '',
    cpf: '',
    contato: '',
    quantidade: 0,
    valorTotal: 0,
    dataVenda: new Date(),
  };

  constructor(private route: ActivatedRoute, private router: Router, private vendasService: VendasService) {}

  ngOnInit(): void {
    const vendaId = Number(this.route.snapshot.paramMap.get('id'));
    const vendaData = this.route.snapshot.paramMap.get('venda');
    const venda = vendaData ? JSON.parse(vendaData) : null;

    if (venda) {
      this.venda = venda;
      this.venda.itemId = vendaId; // Defina o ID do item corretamente
    }
  }

  salvarEdicao() {
    if (this.venda && this.venda.id !== undefined) {
      this.vendasService.editarVenda(this.venda);
      this.router.navigate(['/consulta_vendas']);
    }
  }
}
