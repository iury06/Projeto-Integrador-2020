import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioSalaComponent } from './laboratorio-sala.component';

describe('LaboratorioSalaComponent', () => {
  let component: LaboratorioSalaComponent;
  let fixture: ComponentFixture<LaboratorioSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratorioSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
