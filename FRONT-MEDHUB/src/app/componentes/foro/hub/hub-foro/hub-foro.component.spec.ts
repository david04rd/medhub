import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubForoComponent } from './hub-foro.component';

//GENERADO AUTOMATICAMENTE AL HACER ng g c NOMBRECOMPONENTE


describe('HubForoComponent', () => {
  let component: HubForoComponent;
  let fixture: ComponentFixture<HubForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HubForoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HubForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
