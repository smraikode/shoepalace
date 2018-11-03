import { TestBed } from '@angular/core/testing';

import { InsertSellService } from './insert-sell.service';

describe('InsertSellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertSellService = TestBed.get(InsertSellService);
    expect(service).toBeTruthy();
  });
});
