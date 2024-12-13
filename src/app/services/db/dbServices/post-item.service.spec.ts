import { TestBed } from '@angular/core/testing';

import { PostItemService } from './post-item.service';

describe('PostItemService', () => {
  let service: PostItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
