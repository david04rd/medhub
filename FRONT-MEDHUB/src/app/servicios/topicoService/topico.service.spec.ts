import { TestBed } from '@angular/core/testing';

import { TopicoService } from './topico.service';

//GENERADO AUTOMATICAMENTE AL HACER ng g s NOMBRECOMPONENTE

describe('TopicoService', () => {
  let service: TopicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
