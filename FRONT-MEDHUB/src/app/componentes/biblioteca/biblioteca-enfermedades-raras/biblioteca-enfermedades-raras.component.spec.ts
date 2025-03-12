import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaEnfermedadesRarasComponent } from './biblioteca-enfermedades-raras.component';

describe('BibliotecaEnfermedadesRarasComponent', () => {
  let component: BibliotecaEnfermedadesRarasComponent;
  let fixture: ComponentFixture<BibliotecaEnfermedadesRarasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibliotecaEnfermedadesRarasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliotecaEnfermedadesRarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
