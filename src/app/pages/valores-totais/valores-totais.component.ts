import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-valores-totais',
  templateUrl: './valores-totais.component.html',
  styleUrls: ['./valores-totais.component.css'],
})
export class ValoresTotaisComponent {
  @Input() valorTotalVendas: number = 0;
}
