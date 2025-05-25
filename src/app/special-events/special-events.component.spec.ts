import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { SpecialEventsComponent } from './special-events.component';
import { EventService } from '../event.service';

describe('SpecialEventsComponent', () => {
  let component: SpecialEventsComponent;
  let eventServiceMock: any;

  beforeEach(async () => {
    eventServiceMock = {
      getSpecialEvents: jasmine.createSpy('getSpecialEvents'),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SpecialEventsComponent],
      providers: [{ provide: EventService, useValue: eventServiceMock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(SpecialEventsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch special events on initialization', () => {
    const mockEvents = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    eventServiceMock.getSpecialEvents.and.returnValue(of(mockEvents));

    component.ngOnInit();

    expect(eventServiceMock.getSpecialEvents).toHaveBeenCalled();
    expect(component.events).toEqual(mockEvents);
  });

  it('should handle errors when fetching special events', () => {
    const consoleSpy = spyOn(console, 'log');
    eventServiceMock.getSpecialEvents.and.returnValue(throwError(() => new Error('Error fetching events')));

    component.ngOnInit();

    expect(eventServiceMock.getSpecialEvents).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(new Error('Error fetching events'));
  });
});