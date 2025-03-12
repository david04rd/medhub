import { TestBed } from '@angular/core/testing';

import { SwalMessagesService } from './swal-messages.service';

//GENERADO AUTOMATICAMENTE AL HACER ng g s NOMBRECOMPONENTE


describe('SwalMessagesService', () => {
  let service: SwalMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
