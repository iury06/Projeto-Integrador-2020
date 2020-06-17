import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaClienteComponent } from './pessoa-cliente.component';

describe('PessoaClienteComponent', () => {
  let component: PessoaClienteComponent;
  let fixture: ComponentFixture<PessoaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
