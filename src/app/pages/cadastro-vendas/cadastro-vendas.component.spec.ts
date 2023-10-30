import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVendasComponent } from './cadastro-vendas.component';

describe('CadastroVendasComponent', () => {
  let component: CadastroVendasComponent;
  let fixture: ComponentFixture<CadastroVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroVendasComponent]
    });
    fixture = TestBed.createComponent(CadastroVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
