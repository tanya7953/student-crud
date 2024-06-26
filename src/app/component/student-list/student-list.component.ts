import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { student } from '../studentmodel';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  data: undefined | student[];
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getstudent();
  }
  getstudent() {
    this.api.getstudent().subscribe(res => {
      this.data = res;
    })
  }
  delete(id: number) {
    this.api.deletestudent(id).subscribe(res => {
      alert("Student Deleted successfully");
      this.getstudent();
    })
  }
  logout() {
    localStorage.removeItem("logindata");
  }
}
