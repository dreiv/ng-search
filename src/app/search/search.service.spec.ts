/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuggestService } from './search.service';

describe('SuggestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestService]
    });
  });

  it('should ...', inject([SuggestService], (service: SuggestService) => {
    expect(service).toBeTruthy();
  }));
});
