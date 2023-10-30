import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresTotaisComponent } from './valores-totais.component';

describe('ValoresTotaisComponent', () => {
  let component: ValoresTotaisComponent;
  let fixture: ComponentFixture<ValoresTotaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValoresTotaisComponent]
    });
    fixture = TestBed.createComponent(ValoresTotaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
