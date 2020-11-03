import { TestBed } from '@angular/core/testing';

import { MojservisService } from './mojservis.service';

describe('MojservisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MojservisService = TestBed.get(MojservisService);
    expect(service).toBeTruthy();
  });
});
