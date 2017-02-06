import { TestBed, inject } from '@angular/core/testing';
import { SuggestService } from './suggest.service';

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
