import { TestBed } from '@angular/core/testing';

import { FormUpdateService } from './form-update.service';

describe('FormUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormUpdateService = TestBed.get(FormUpdateService);
    expect(service).toBeTruthy();
  });
});
