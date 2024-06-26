import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './component/student-list/student-list.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';
import { LoginSignupComponent } from './component/login-signup/login-signup.component';
import { authGuard } from './shared/auth.guard';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { 'path': 'studentlist', component: StudentListComponent, canActivate: [authGuard] },
  { 'path': 'addStudent', component: AddStudentComponent, canActivate: [authGuard] },
  { 'path': 'updateStudent/:id', component: UpdateStudentComponent, canActivate: [authGuard] },
  { 'path': 'login-signup', component: LoginSignupComponent },
  { 'path': '', redirectTo: 'login-signup', pathMatch: 'full' },
  { 'path': '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
