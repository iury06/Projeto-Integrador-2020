import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemClienteComponent } from './ordem-cliente.component';

describe('OrdemClienteComponent', () => {
  let component: OrdemClienteComponent;
  let fixture: ComponentFixture<OrdemClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
