import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVendasComponent } from './consulta-vendas.component';

describe('ConsultaVendasComponent', () => {
  let component: ConsultaVendasComponent;
  let fixture: ComponentFixture<ConsultaVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaVendasComponent]
    });
    fixture = TestBed.createComponent(ConsultaVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
