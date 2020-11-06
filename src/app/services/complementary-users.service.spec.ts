simport { TestBed } from '@angular/core/testing';

import { ComplementaryUsersService } from './complementary-users.service';

describe('ComplementaryUsersService', () => {
  let service: ComplementaryUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplementaryUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
