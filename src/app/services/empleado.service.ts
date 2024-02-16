import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  listEmpleados: Empleado[] = [];

  constructor() {
    for (let i = 0; i < 30; i++) {
      this.listEmpleados.push({
        nombreCompleto: "Persona " + (i + 1),
        correo: "persona" + (i + 6) + "@example.com",
        telefono: Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000,
        sexo: i % 2 === 0 ? "Masculino" : "Femenino",
        fechaIngreso: new Date("2024-02-16"),
        estadoCivil: i % 3 === 0 ? "Soltero" : i % 2 === 0 ? "Casado" : "Divorciado"
      });
    }
  }

  getEmpleados() {
    return this.listEmpleados.slice();
  }

  eliminarEmpleado(index: number) {
    this.listEmpleados.splice(index, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    this.listEmpleados.unshift(empleado);
  }

  getEmpleado(index: number) {
    return this.listEmpleados[index];
  }

  editarEmpleado(empleado: Empleado, idEmpleado: number) {
    this.listEmpleados[idEmpleado].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleados[idEmpleado].correo = empleado.correo;
    this.listEmpleados[idEmpleado].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleados[idEmpleado].telefono = empleado.telefono;
    this.listEmpleados[idEmpleado].estadoCivil = empleado.estadoCivil;
    this.listEmpleados[idEmpleado].sexo = empleado.sexo;
  }
}
