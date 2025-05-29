import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      loginUser: jasmine.createSpy('loginUser').and.returnValue(of({ token: 'mockToken' }))
    };
  
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };
  
    await TestBed.configureTestingModule({
      imports: [LoginComponent], // Add LoginComponent to imports instead of declarations
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call loginUser and navigate to /special on success', () => {
    component.loginUserData = { email: 'test@example.com', password: 'password123' };
    component.loginUser();

    expect(authServiceMock.loginUser).toHaveBeenCalledWith(component.loginUserData);
    expect(localStorage.getItem('token')).toBe('mockToken');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/special']);
  });
  it('should log an error when loginUser fails', () => {
    const error = { message: 'Login failed' };
    authServiceMock.loginUser.and.returnValue(of(error));
  
    spyOn(console, 'log');
    component.loginUser();
  
    expect(authServiceMock.loginUser).toHaveBeenCalledWith(component.loginUserData);
    expect(console.log).toHaveBeenCalledWith(error);
  });
  it('should create the component and initialize dependencies', () => {
    expect(component).toBeTruthy();
    expect(component['_auth']).toBeTruthy();
    expect(component['_router']).toBeTruthy();
  });
  it('should bind loginUserData to the form inputs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[name="password"]') as HTMLInputElement;
  
    emailInput.value = 'test@example.com';
    passwordInput.value = 'password123';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
  
    expect(component.loginUserData.email).toBe('test@example.com');
    expect(component.loginUserData.password).toBe('password123');
  });
});