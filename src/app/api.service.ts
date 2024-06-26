import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { student } from './component/studentmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //POST
  addStudent(data: student) {
    return this.http.post<student>("http://localhost:3000/students",data);
  }
  //GET
  getstudent() {
    return this.http.get<student[]>("http://localhost:3000/students")
  }

  //fetching data on edit
  fetchdata(id: number) {
    return this.http.get<student>("http://localhost:3000/students/" +id)
  }

  updatestudent(data: student, id: number) {
    return this.http.put<student>("http://localhost:3000/students/"+ id,data)
  }

  deletestudent(id: number) {
    return this.http.delete<student>("http://localhost:3000/students/" + id )
  }

}
