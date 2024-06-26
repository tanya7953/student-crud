import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { student } from '../studentmodel';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {
  public studentid!: number;
  public studentdata: student = {} as student;
  constructor(private api: ApiService, private activatedroute: ActivatedRoute, private route: Router) { }
  ngOnInit(): void {
    this.activatedroute.params.subscribe((param: Params) => {
      this.studentid = param['id']
    })
    this.api.fetchdata(this.studentid).subscribe((data: student) => {
      this.studentdata = data;
      console.log(data);  
    })
  }
  update() {
    this.api.updatestudent(this.studentdata, this.studentid).subscribe((res: student) => {
      alert("Data Updated successfully");
      this.route.navigate(['/studentlist']);
    })
  }
  private alphabeticValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !/^[a-zA-Z]+$/.test(value)) {
      return { 'alphabetic': true };
    }
    return null;
  }
}
