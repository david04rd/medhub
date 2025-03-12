import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaTratamientosComponent } from './biblioteca-tratamientos.component';

describe('BibliotecaTratamientosComponent', () => {
  let component: BibliotecaTratamientosComponent;
  let fixture: ComponentFixture<BibliotecaTratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibliotecaTratamientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliotecaTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
