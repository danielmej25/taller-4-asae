import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { throwError } from 'rxjs';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2';
import { Student } from '../models/Student';

@Component({
  selector: 'app-add-estudent',
  templateUrl: './add-estudent.component.html',
  styleUrls: ['./add-estudent.component.scss'],
})
export class AddEstudentComponent implements OnInit {
  idTypes!: any[];
  genders!: any[];
  populationTypes!: any[];
  ethnicities!: any[];
  masterStatus!: any[];
  modality!: any[];
  errors!: string[];
  studentForm!: any;
  validate: boolean;
  loadingSearch!: boolean;
  searched!: boolean;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService
  ) {
    this.idTypes = [{ name: 'CC' }, { name: 'TI' }, { name: 'CE' }];
    this.genders = [
      { name: 'Masculino', code: 'M' },
      { name: 'Femenino', code: 'F' },
      { name: 'otro', code: 'O' },
    ];

    this.populationTypes = [
      { name: 'Local' },
      { name: 'Urbana' },
      { name: 'Rural' },
    ];

    this.ethnicities = [
      { name: 'Indígena' },
      { name: 'Afrodescendiente' },
      { name: 'Gitano' },
    ];

    this.masterStatus = [
      { name: 'Activo' },
      { name: 'Finalizo matricula' },
      { name: 'Suspendido' },
    ];

    this.modality = [{ name: 'Investigación' }, { name: 'Práctica' }];
    this.validate = false;
    this.setValidations(this.validate);
  }

  ngOnInit(): void {
    this.validate = true;
    this.loadingSearch = false;
    this.searched = false;
    this.errors = [];
  }

  updateStudent() {
    if (this.searched) {
      const student = this.getFormValues();
      this.studentsService.updateStudent(student.code, student).subscribe(
        (result) => {
          Swal.fire(
            'Buen trabajo!',
            'Se ha actulizado el estudiante exitosamente',
            'success'
          );
          this.ngOnInit();
        },
        (error) => {
          if (error.status == 400) {
            const map = new Map(Object.entries(error.error));
            const vector = Array.from(map.values());
            this.errors = vector as string[];
          }
        },
        () => {
          this.ngOnInit();
        }
      );
    }
  }
  searchStudent(code: number) {
    this.loadingSearch = true;

    this.studentsService.getStudent(code).subscribe(
      (result: Student) => {
        this.setFormValues(result);
        this.searched = true;
      },
      (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'No se encontro el estudiante...',
          text: error.error.mensaje,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
      () => {
        this.loadingSearch = false;
      }
    );
  }

  setFormValues(student: Student) {
    this.studentForm.get('code').setValue(student.code);
    this.studentForm.get('idType').setValue(student.idType);
    this.studentForm.get('idNumber').setValue(student.idNumber);
    this.studentForm.get('names').setValue(student.names);
    this.studentForm.get('lastNames').setValue(student.lastNames);
    this.studentForm.get('collegeEmail').setValue(student.collegeEmail);
    this.studentForm.get('alternativeEmail').setValue(student.alternativeEmail);
    this.studentForm.get('city').setValue(student.city);
    this.studentForm.get('workCompany').setValue(student.workCompany);
    this.studentForm
      .get('undergraduateDegree')
      .setValue(student.undergraduateDegree);
    this.studentForm.get('phoneNumber').setValue(student.phoneNumber);
    this.studentForm.get('gender').setValue(student.gender);
    this.studentForm.get('typePopulation').setValue(student.typePopulation);
    this.studentForm.get('ethnicity').setValue(student.ethnicity);
    this.studentForm.get('disability').setValue(student.disability);
    this.studentForm.get('masterStatus').setValue(student.masterStatus);
    this.studentForm.get('modality').setValue(student.modality);
    this.studentForm.get('academicSemester').setValue(student.academicSemester);
    this.studentForm
      .get('financialSemester')
      .setValue(student.financialSemester);
  }

  setValidations(validate: boolean) {
    this.validate = !validate;
    if (validate) {
      this.studentForm = this.fb.group({
        code: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        idType: ['CC', Validators.required],
        idNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        names: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[A-Za-z á-ú]*'),
          ],
        ],
        lastNames: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[A-Za-z ]*'),
          ],
        ],
        collegeEmail: ['', [Validators.required, Validators.email]],
        alternativeEmail: ['', Validators.email],
        city: ['', [Validators.minLength(2), Validators.pattern('[A-Za-z ]*')]],
        workCompany: [
          '',
          [Validators.minLength(5), Validators.pattern('[A-Za-z ]*')],
        ],
        undergraduateDegree: [
          '',
          [Validators.minLength(5), Validators.pattern('[A-Za-z ]*')],
        ],
        phoneNumber: [
          '',
          [
            Validators.pattern('^[0-9]*$'),
            Validators.maxLength(10),
            Validators.minLength(10),
          ],
        ],
        gender: ['', Validators.required],
        typePopulation: [''],
        ethnicity: [''],
        disability: [''],
        masterStatus: ['', Validators.required],
        modality: ['', Validators.required],
        academicSemester: ['', [Validators.pattern('^[0-9]*$')]],
        financialSemester: ['', [Validators.pattern('^[0-9]*$')]],
      });
    } else {
      this.studentForm = this.fb.group({
        code: [''],
        idType: ['CC'],
        idNumber: [''],
        names: [''],
        lastNames: [''],
        collegeEmail: [''],
        alternativeEmail: [''],
        city: [''],
        workCompany: [''],
        undergraduateDegree: [''],
        phoneNumber: [''],
        gender: [''],
        typePopulation: [''],
        ethnicity: [''],
        disability: [''],
        masterStatus: [''],
        modality: [''],
        academicSemester: [''],
        financialSemester: [''],
      });
    }
  }

  getFormValues(): Student {
    const student: Student = {
      code: this.studentForm.value.code,
      idType: this.studentForm.value.idType,
      idNumber: this.studentForm.value.idNumber,
      names: this.studentForm.value.names,
      lastNames: this.studentForm.value.lastNames,
      collegeEmail: this.studentForm.value.collegeEmail,
      alternativeEmail: this.studentForm.value.alternativeEmail,
      city: this.studentForm.value.city,
      workCompany: this.studentForm.value.workCompany,
      undergraduateDegree: this.studentForm.value.undergraduateDegree,
      phoneNumber: this.studentForm.value.phoneNumber,
      gender: this.studentForm.value.gender,
      typePopulation: this.studentForm.value.typePopulation,
      ethnicity: this.studentForm.value.ethnicity,
      disability: this.studentForm.value.disability,
      masterStatus: this.studentForm.value.masterStatus,
      modality: this.studentForm.value.modality,
      academicSemester: this.studentForm.value.academicSemester,
      financialSemester: this.studentForm.value.financialSemester,
    };
    return student;
  }
  addStudent(): void {
    const student = this.getFormValues();
    this.studentsService.saveStudent(student).subscribe(
      (result) => {
        Swal.fire(
          'Buen trabajo!',
          'Se ha guardado el estudiante exitosamente',
          'success'
        );
        this.ngOnInit();
      },
      (error) => {
        if (error.status == 400) {
          const map = new Map(Object.entries(error.error));
          const vector = Array.from(map.values());
          this.errors = vector as string[];
        }
      },
      () => {
        this.ngOnInit();
      }
    );
  }
}
