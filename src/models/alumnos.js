export default class Alumno {
    constructor(username = "Desconocido", dni = "Sin DNI", edad = "Sin edad") {
      this.username = username;
      this.dni = dni;
      this.edad = edad;
    }
  
    toString() {
      return `Alumno: ${this.username}, DNI: ${this.dni}, Edad: ${this.edad}`;
    }
  }
  