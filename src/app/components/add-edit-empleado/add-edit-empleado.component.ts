import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from '@angular/material/radio';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrl: './add-edit-empleado.component.css',
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'warn' },
    },
  ],
})
export class AddEditEmpleadoComponent implements OnInit {
  estadosCiviles: any[] = ['Soltero', 'Casado', 'Divorciado'];
  myForm: FormGroup;
  idEmpleado: any;
  accion = 'Crear';

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private route: Router,
    public snackBar: MatSnackBar,
    private aRoute: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });
    const idParam = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[idParam];

  }
  ngOnInit(): void {

    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.getEmpleado();
    }
  }

  guardarEmpleado() {
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto').value,
      correo: this.myForm.get('correo').value,
      fechaIngreso: this.myForm.get('fechaIngreso').value,
      telefono: this.myForm.get('telefono').value,
      estadoCivil: this.myForm.get('estadoCivil').value,
      sexo: this.myForm.get('sexo').value,
    };

    if (this.accion === 'Editar') {
      this.editarEmpleado(empleado)
    } else {
      this.agregarEmpleado(empleado)
    }

    this.route.navigate(['/']);
  }

  getEmpleado() {
    const empleado: Empleado = this.empleadoService.getEmpleado(this.idEmpleado);
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correo: empleado.correo,
      fechaIngreso: empleado.fechaIngreso,
      telefono: empleado.telefono,
      estadoCivil: empleado.estadoCivil,
      sexo: empleado.sexo,
    })
  }

  agregarEmpleado(empleado: Empleado) {
    this.empleadoService.agregarEmpleado(empleado);
    this.snackBar.open('El empleado fue agregado con exito', '', {
      duration: 2000,
    });
  }

  editarEmpleado(empleado: Empleado) {
    this.empleadoService.editarEmpleado(empleado, this.idEmpleado);
    this.snackBar.open('El empleado fue editado con exito', '', {
      duration: 2000,
    });
  }
}
