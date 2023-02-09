import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {
  students!: Student[];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.studentsService.getAllStudents().subscribe(
      (result) => {
        this.students = result;
        if (this.students.length < 1) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay estudiantes registrados',
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      },
      (error) => {
        this.students = [];
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
      () => {}
    );
  }

  deleteStudent(code: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar este estudiante?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.deleteStudent(code).subscribe(
          (result) => {
            Swal.fire(
              'Eliminación exitosa!',
              'Se ha eliminado el estudiante de manera exitosa',
              'success'
            );
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>',
            });
          },
          () => {}
        );
      }
    });
  }
}
