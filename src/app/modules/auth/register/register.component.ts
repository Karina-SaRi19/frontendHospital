import { Component, ViewChild, ElementRef } from '@angular/core';
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

  registroExitoso = false;
  loading = false;
  hidePassword = true;
  passwordStrength = 0;

  @ViewChild('successSound') successSound!: ElementRef<HTMLAudioElement>;

  dias = Array.from({ length: 31 }, (_, i) => i + 1);
  anios = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  tiposSangre = ['O+','O-','A+','A-','B+','B-','AB+','AB-'];

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
      password: ['', Validators.required],
      telefono: ['', Validators.required]
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
    const { dia, mes, anio } = this.datosPersonalesForm.value;
    if (!dia || !mes || !anio) return false;
    const fecha = new Date(anio, mes - 1, dia);
    return fecha.getFullYear() === anio &&
           fecha.getMonth() === mes - 1 &&
           fecha.getDate() === dia;
  }

  registrar() {

    if (!this.fechaValida()) return;
    if (this.datosPersonalesForm.invalid || this.contactoForm.invalid) return;

    this.loading = true;

    setTimeout(() => {

      this.registroExitoso = true;
      this.successSound.nativeElement.play();

      setTimeout(() => {
        this.router.navigate(['/login/login']);
      }, 3500);

    }, 800);
  }

  irLogin() {
    this.router.navigate(['/login/login']);
  }
}
