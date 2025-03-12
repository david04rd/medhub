import { TestBed } from '@angular/core/testing';

import { EntradaBibliotecaService } from './entrada-biblioteca.service';

describe('EntradaBibliotecaService', () => {
  let service: EntradaBibliotecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaBibliotecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
