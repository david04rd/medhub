import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageNotFoundComponent } from './error-page-not-found.component';

//GENERADO AUTOMATICAMENTE AL HACER ng g c NOMBRECOMPONENTE


describe('ErrorPageNotFoundComponent', () => {
  let component: ErrorPageNotFoundComponent;
  let fixture: ComponentFixture<ErrorPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
