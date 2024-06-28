import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateStudentComponent } from './update-student.component';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { student } from '../studentmodel';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('UpdateStudentComponent', () => {
  let component: UpdateStudentComponent;
  let fixture: ComponentFixture<UpdateStudentComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;

  const mockStudentData: student = { id: 1, firstname: 'Tanya', lastname: 'Sharma', rollnumber: 123, department: 'Engineer', gender: 'Female' };

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['fetchdata', 'updatestudent']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [UpdateStudentComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    })
      .compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    apiService.fetchdata.and.returnValue(of(mockStudentData));
    apiService.updatestudent.and.returnValue(of(mockStudentData));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch student data on init', () => {
    expect(apiService.fetchdata).toHaveBeenCalledWith(1);
    expect(component.studentdata).toEqual(mockStudentData);
  });

  it('should update student data', () => {
    component.studentdata.firstname = 'Jane';
    component.update();
    expect(apiService.updatestudent).toHaveBeenCalledWith(component.studentdata, 1);
    expect(router.navigate).toHaveBeenCalledWith(['/studentlist']);
  });

 

  it('should enable the update button when the form is valid', () => {
    component.studentdata = mockStudentData;
    fixture.detectChanges();
    const updateButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(updateButton.disabled).toBeFalse();
  });

  
});
