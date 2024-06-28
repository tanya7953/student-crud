import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AddStudentComponent } from './add-student.component';
import { ApiService } from '../../api.service';

class MockApiService {
  addStudent(data: any) {
    return of(data);
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AddStudentComponent', () => {
  let component: AddStudentComponent;
  let fixture: ComponentFixture<AddStudentComponent>;
  let mockApiService: MockApiService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockApiService = new MockApiService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [AddStudentComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    const form = component.studentForm;
    expect(form).toBeTruthy();
    expect(form.get('firstname')).toBeTruthy();
    expect(form.get('lastname')).toBeTruthy();
    expect(form.get('rollnumber')).toBeTruthy();
    expect(form.get('department')).toBeTruthy();
    expect(form.get('gender')).toBeTruthy();
    expect(form.get('terms')).toBeTruthy();
  });

  it('should validate the form correctly', () => {
    const form = component.studentForm;
    const firstNameControl = form.get('firstname');
    const lastNameControl = form.get('lastname');

    firstNameControl?.setValue('Tanya');
    lastNameControl?.setValue('Sharma');
    form.get('rollnumber')?.setValue('12345');
    form.get('department')?.setValue('Engineer');
    form.get('gender')?.setValue('Female');
    form.get('terms')?.setValue(true);

    expect(form.valid).toBeTrue();

    firstNameControl?.setValue('Tanya123');
    expect(form.valid).toBeFalse();
    expect(firstNameControl?.errors?.['alphabetic']).toBeTrue();
  });



  it('should not submit an invalid form', () => {
    spyOn(mockApiService, 'addStudent').and.callThrough();

    const form = component.studentForm;
    form.get('firstname')?.setValue('');
    form.get('lastname')?.setValue('Sharma');
    form.get('rollnumber')?.setValue('12345');
    form.get('department')?.setValue('Finance');
    form.get('gender')?.setValue('female');
    form.get('terms')?.setValue(true);

    component.submitStudent(form.value);
    expect(mockApiService.addStudent).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
