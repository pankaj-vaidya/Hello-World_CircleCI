import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}) // Mock the params observable
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ngApp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Hello, ngApp');
  });
  it('should render the title in an h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1')!;
    expect(h1.textContent).toContain('Hello, ngApp');
  });
  it('should display the Events link in bold', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const eventsLink = compiled.querySelector('a.nav-link[routerLink="/events"]') as HTMLElement;
    const fontWeight = window.getComputedStyle(eventsLink).getPropertyValue('font-weight');
    expect(fontWeight).toBe('700');
  });

  it('should have a navigation bar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navBar = compiled.querySelector('nav');
    expect(navBar).toBeTruthy();
  });

  it('should have a footer with the correct text', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Ensure the DOM is updated
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy(); // Ensure the footer exists
    expect(footer?.textContent).toContain('© 2025 My Angular App');
  });

  it('should call a method when a button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'onButtonClick');
    fixture.detectChanges(); // Ensure the DOM is updated
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy(); // Ensure the button exists
    button?.click();
    expect(app.onButtonClick).toHaveBeenCalled();
  });
});