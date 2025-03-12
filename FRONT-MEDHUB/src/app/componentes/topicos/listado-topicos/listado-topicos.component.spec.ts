import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTopicosComponent } from './listado-topicos.component';

describe('ListadoTopicosComponent', () => {
  let component: ListadoTopicosComponent;
  let fixture: ComponentFixture<ListadoTopicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoTopicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoTopicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
