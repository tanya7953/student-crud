import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstname: ['', [Validators.required, this.alphabeticValidator]],
      lastname: ['', [Validators.required, this.alphabeticValidator]],
      rollnumber: ['', Validators.required],
      department: ['', Validators.required],
      gender: ['', Validators.required],
      terms: ['', Validators.requiredTrue]
    });
  }

  submitStudent(data: any): void {
    if (this.studentForm.valid) {
      this.api.addStudent(data).subscribe((res: any) => {
        this.studentForm.reset();
        this.router.navigate(["/studentlist"]);
        localStorage.setItem('studnetdata', JSON.stringify(data));
      });
    }
  }

  private alphabeticValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !/^[a-zA-Z]+$/.test(value)) {
      return { 'alphabetic': true };
    }
    return null;
  }
}
