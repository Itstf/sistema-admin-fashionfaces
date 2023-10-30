import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConsultavendasComponent } from './editar-consultavendas.component';

describe('EditarConsultavendasComponent', () => {
  let component: EditarConsultavendasComponent;
  let fixture: ComponentFixture<EditarConsultavendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarConsultavendasComponent]
    });
    fixture = TestBed.createComponent(EditarConsultavendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
