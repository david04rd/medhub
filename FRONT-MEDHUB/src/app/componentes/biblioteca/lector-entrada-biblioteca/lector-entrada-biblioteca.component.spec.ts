import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorEntradaBibliotecaComponent } from './lector-entrada-biblioteca.component';

describe('LectorEntradaBibliotecaComponent', () => {
  let component: LectorEntradaBibliotecaComponent;
  let fixture: ComponentFixture<LectorEntradaBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LectorEntradaBibliotecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LectorEntradaBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
