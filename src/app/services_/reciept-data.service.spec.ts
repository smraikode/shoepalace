import { TestBed } from '@angular/core/testing';

import { RecieptDataService } from './reciept-data.service';

describe('RecieptDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecieptDataService = TestBed.get(RecieptDataService);
    expect(service).toBeTruthy();
  });
});
