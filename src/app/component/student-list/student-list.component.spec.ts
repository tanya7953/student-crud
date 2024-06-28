import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StudentListComponent } from './student-list.component';
import { ApiService } from '../../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { student } from '../studentmodel';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockStudentData: student[] = [
    { id: 1, firstname: 'Tanya', lastname: 'Sharma', rollnumber: 123, department: 'Engineer', gender: 'Female' },
    { id: 2, firstname: 'Akshit', lastname: 'Sharma', rollnumber: 456, department: 'Banking', gender: 'Male' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getstudent', 'deletestudent']);
    await TestBed.configureTestingModule({
      declarations: [StudentListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: spy }]
    })
      .compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    apiService.getstudent.and.returnValue(of(mockStudentData));
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getstudent on init', () => {
    expect(apiService.getstudent).toHaveBeenCalled();
    expect(component.data).toEqual(mockStudentData);
  });

  it('should display student data in the table', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('Sharma');
    expect(firstRowCells[1].nativeElement.textContent).toContain('123');
    expect(firstRowCells[2].nativeElement.textContent).toContain('ENGINEER');
    expect(firstRowCells[3].nativeElement.textContent).toContain('Female');
  });

 

  it('should remove logindata from localStorage on logout', () => {
    spyOn(localStorage, 'removeItem');
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('logindata');
  });

  it('should have a working Add Student button', () => {
    const addButton = fixture.debugElement.query(By.css('button[routerLink="/addStudent"]'));
    expect(addButton).toBeTruthy();
  });

  it('should have a working Logout button', () => {
    const logoutButton = fixture.debugElement.query(By.css('button[routerLink="/"]'));
    expect(logoutButton).toBeTruthy();
  });

  it('should call delete method when delete icon is clicked', () => {
    spyOn(component, 'delete');
    const deleteIcon = fixture.debugElement.queryAll(By.css('.fas.fa-trash'))[0];
    deleteIcon.triggerEventHandler('click', null);
    expect(component.delete).toHaveBeenCalledWith(mockStudentData[0].id);
  });
});
