import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntradaBibliotecaComponent } from './crear-entrada-biblioteca.component';

describe('CrearEntradaBibliotecaComponent', () => {
  let component: CrearEntradaBibliotecaComponent;
  let fixture: ComponentFixture<CrearEntradaBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEntradaBibliotecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEntradaBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
