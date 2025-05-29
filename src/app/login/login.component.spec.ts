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
});