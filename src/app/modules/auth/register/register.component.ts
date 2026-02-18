import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  datosPersonalesForm!: FormGroup;
  contactoForm!: FormGroup;
  infoMedicaForm!: FormGroup;

  loading = false;
  hidePassword = true;
  passwordStrength = 0;

  dias = Array.from({ length: 31 }, (_, i) => i + 1);

  meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' }
  ];

  anios = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  tiposSangre = ['O+','O-','A+','A-','B+','B-','AB+','AB-'];

  constructor(private fb: FormBuilder, private router: Router) {

    this.datosPersonalesForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      anio: ['', Validators.required],
      sexo: ['', Validators.required],
      tipoSangre: ['', Validators.required]
    });

    this.contactoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).+$/)
        ]
      ],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    this.infoMedicaForm = this.fb.group({
      alergias: ['', Validators.required],
      antecedentes: ['', Validators.required],
      observaciones: ['', Validators.required]
    });

    this.contactoForm.get('password')?.valueChanges.subscribe(v => {
      this.passwordStrength = this.calcularSeguridad(v);
    });
  }

  calcularSeguridad(password: string): number {
    let fuerza = 0;
    if (!password) return 0;
    if (password.length >= 8) fuerza++;
    if (/[A-Z]/.test(password)) fuerza++;
    if (/[a-z]/.test(password)) fuerza++;
    if (/\d/.test(password)) fuerza++;
    if (/[@$!%*?&.#_-]/.test(password)) fuerza++;
    return fuerza;
  }

  getColorBarra(): string {
    if (this.passwordStrength <= 2) return '#e53935';
    if (this.passwordStrength <= 4) return '#fb8c00';
    return '#43a047';
  }

  fechaValida(): boolean {
    const d = this.datosPersonalesForm.value.dia;
    const m = this.datosPersonalesForm.value.mes;
    const a = this.datosPersonalesForm.value.anio;
    if (!d || !m || !a) return false;

    const fecha = new Date(a, m - 1, d);
    return fecha.getFullYear() === a &&
           fecha.getMonth() === m - 1 &&
           fecha.getDate() === d;
  }

  registrar() {

    if (!this.fechaValida()) {
      alert('Fecha de nacimiento inválida');
      return;
    }

    if (
      this.datosPersonalesForm.invalid ||
      this.contactoForm.invalid ||
      this.infoMedicaForm.invalid
    ) return;

    this.loading = true;

    const fechaNacimiento =
      `${this.datosPersonalesForm.value.anio}-` +
      `${String(this.datosPersonalesForm.value.mes).padStart(2,'0')}-` +
      `${String(this.datosPersonalesForm.value.dia).padStart(2,'0')}`;

    const registroCompleto = {
      ...this.datosPersonalesForm.value,
      ...this.contactoForm.value,
      ...this.infoMedicaForm.value,
      fechaNacimiento
    };

    console.log(registroCompleto);

    setTimeout(() => {
      alert('Paciente registrado correctamente');
      this.router.navigate(['/login/login']);
    }, 1200);
  }

  irLogin() {
    this.router.navigate(['/login/login']);
  }
}
