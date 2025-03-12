import { TestBed } from '@angular/core/testing';

import { NoticiaService } from './noticia.service';

//GENERADO AUTOMATICAMENTE AL HACER ng g s NOMBRECOMPONENTE


describe('NoticiaService', () => {
  let service: NoticiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
