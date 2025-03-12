import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNoticiaComponent } from './crear-noticia.component';

//GENERADO AUTOMATICAMENTE AL HACER ng g c NOMBRECOMPONENTE

describe('CrearNoticiaComponent', () => {
  let component: CrearNoticiaComponent;
  let fixture: ComponentFixture<CrearNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
