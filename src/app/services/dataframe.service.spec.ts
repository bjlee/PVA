import { TestBed, inject } from '@angular/core/testing';

import { DataframeService } from './dataframe.service';

describe('DataframeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataframeService]
    });
  });

  it('should be created', inject([DataframeService], (service: DataframeService) => {
    expect(service).toBeTruthy();
  }));
});
