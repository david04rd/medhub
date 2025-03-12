import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubNoticiasComponent } from './hub-noticias.component';

//GENERADO AUTOMATICAMENTE AL HACER ng g c NOMBRECOMPONENTE

describe('HubNoticiasComponent', () => {
  let component: HubNoticiasComponent;
  let fixture: ComponentFixture<HubNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HubNoticiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HubNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
