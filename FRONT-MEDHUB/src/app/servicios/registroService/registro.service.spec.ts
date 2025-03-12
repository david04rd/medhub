import { TestBed } from '@angular/core/testing';

import { RegistroService } from './registro.service';

//GENERADO AUTOMATICAMENTE AL HACER ng g s NOMBRECOMPONENTE


describe('RegistroService', () => {
  let service: RegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
