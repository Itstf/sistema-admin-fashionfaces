import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/estoque.service';
import { Estoque } from 'src/app/estoque.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-estoque',
  templateUrl: './editar-estoque.component.html',
  styleUrls: ['./editar-estoque.component.css'],
})
export class EditarEstoqueComponent implements OnInit {
  item: Estoque | undefined;

  constructor(
    private estoqueService: EstoqueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const itemId = +idParam;
        this.item = this.estoqueService.obterItemPorId(itemId);
      }
    });
  }

  atualizarItem() {
    if (this.item && this.item.id !== undefined) {
      this.estoqueService.atualizarEstoqueItem(this.item.id, this.item.quantidade);
      this.router.navigate(['/consulta_estoque']);
    }
  }
}
