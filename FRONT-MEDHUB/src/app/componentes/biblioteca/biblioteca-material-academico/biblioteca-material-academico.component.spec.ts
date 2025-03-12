import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaMaterialAcademicoComponent } from './biblioteca-material-academico.component';

describe('BibliotecaMaterialAcademicoComponent', () => {
  let component: BibliotecaMaterialAcademicoComponent;
  let fixture: ComponentFixture<BibliotecaMaterialAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibliotecaMaterialAcademicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliotecaMaterialAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
