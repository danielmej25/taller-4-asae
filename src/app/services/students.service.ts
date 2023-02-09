import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../students/models/Student';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  api = 'http://localhost:8081/api/v1/student';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get(this.api).pipe(map((res) => res as Student[]));
  }

  getStudent(code: number): Observable<Student> {
    return this.http.get<Student>(`${this.api}/${code}`);
  }

  updateStudent(code: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.api}/${code}`, student);
  }

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.api, student).pipe(
      catchError((error) => {
        if (error.status == 400) {
          return throwError(error);
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje,
          footer: '<a href="">Why do I have this issue?</a>',
        });
        return throwError(error);
      })
    );
  }
  deleteStudent(code: number): Observable<any> {
    return this.http.delete(`${this.api}?codeStudent=${code}`);
  }
}
