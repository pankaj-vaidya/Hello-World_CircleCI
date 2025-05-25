import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { HttpClientModule } from '@angular/common/http';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Import HttpClientTestingModule
      providers: [EventService]
    });
    
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
