import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEntradasBibliotecaComponent } from './nav-entradas-biblioteca.component';

describe('NavEntradasBibliotecaComponent', () => {
  let component: NavEntradasBibliotecaComponent;
  let fixture: ComponentFixture<NavEntradasBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavEntradasBibliotecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavEntradasBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
