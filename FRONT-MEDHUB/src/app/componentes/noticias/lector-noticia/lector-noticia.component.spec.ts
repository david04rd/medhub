import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorNoticiaComponent } from './lector-noticia.component';

//GENERADO AUTOMATICAMENTE AL HACER ng g c NOMBRECOMPONENTE


describe('LectorNoticiaComponent', () => {
  let component: LectorNoticiaComponent;
  let fixture: ComponentFixture<LectorNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LectorNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LectorNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
