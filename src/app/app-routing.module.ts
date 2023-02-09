import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEstudentComponent } from './students/add-estudent/add-estudent.component';
import { ListStudentsComponent } from './students/list-students/list-students.component';

const routes: Routes = [
  { path: 'add-student', component: AddEstudentComponent },
  { path: 'list-student', component: ListStudentsComponent },
  { path: '**', component: ListStudentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
