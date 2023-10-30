import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEstoqueComponent } from './consulta-estoque.component';

describe('ConsultaEstoqueComponent', () => {
  let component: ConsultaEstoqueComponent;
  let fixture: ComponentFixture<ConsultaEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaEstoqueComponent]
    });
    fixture = TestBed.createComponent(ConsultaEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
