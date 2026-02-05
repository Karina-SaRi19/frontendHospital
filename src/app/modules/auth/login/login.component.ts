import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    hidePassword = true;
    loading = false;
    errorMessage = '';
    returnUrl: string = '/dashboard';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        // Si ya está logueado → dashboard
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
            return;
        }

        // Formulario
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // URL de retorno
        this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    // Getters usados en el HTML
    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        const { email, password } = this.loginForm.value;

        // Simulación de login
        setTimeout(() => {
            const success = this.authService.login(email, password);

            this.loading = false;

            if (success) {
                this.router.navigate([this.returnUrl]);
            } else {
                this.errorMessage = 'Credenciales inválidas';
            }
        }, 1200);
    }

    forgotPassword(): void {
        alert('Funcionalidad de recuperación de contraseña (pendiente)');
    }
}
