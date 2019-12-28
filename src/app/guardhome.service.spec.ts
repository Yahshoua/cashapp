import { TestBed } from '@angular/core/testing';

import { GuardhomeService } from './guardhome.service';

describe('GuardhomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardhomeService = TestBed.get(GuardhomeService);
    expect(service).toBeTruthy();
  });
});
