import { TestBed } from '@angular/core/testing';

import { AlphabeticalScrollBarService } from './alphabetical-scroll-bar.service';

describe('AlphabeticalScrollBarService', () => {
  let service: AlphabeticalScrollBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphabeticalScrollBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
