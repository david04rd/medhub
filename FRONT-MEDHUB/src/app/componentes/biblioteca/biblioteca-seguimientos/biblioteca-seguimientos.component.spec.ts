import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaSeguimientosComponent } from './biblioteca-seguimientos.component';

describe('BibliotecaSeguimientosComponent', () => {
  let component: BibliotecaSeguimientosComponent;
  let fixture: ComponentFixture<BibliotecaSeguimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibliotecaSeguimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliotecaSeguimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
