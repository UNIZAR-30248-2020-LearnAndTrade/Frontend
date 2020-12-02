import { TestBed } from '@angular/core/testing';

import { GetThemeService } from './get-theme.service';

describe('GetThemeService', () => {
  let service: GetThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
