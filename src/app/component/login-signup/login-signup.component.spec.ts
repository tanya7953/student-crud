import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginSignupComponent } from './login-signup.component';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;
  let httpTestingController: HttpTestingController;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [LoginSignupComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the forms', () => {
    const signupForm = component.signupform;
    const loginForm = component.loginform;

    expect(signupForm).toBeTruthy();
    expect(signupForm.get('name')).toBeTruthy();
    expect(signupForm.get('email')).toBeTruthy();
    expect(signupForm.get('password')).toBeTruthy();

    expect(loginForm).toBeTruthy();
    expect(loginForm.get('email')).toBeTruthy();
    expect(loginForm.get('password')).toBeTruthy();
  });

  it('should switch to signup form', () => {
    component.signup();
    expect(component.isshow).toBeTrue();
  });

  it('should switch to login form', () => {
    component.login();
    expect(component.isshow).toBeFalse();
  });

  
});
