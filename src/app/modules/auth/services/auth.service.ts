import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private router: Router) { }

    login(email: string, password: string): boolean {
        if (email && password) {
            localStorage.setItem('hplus_logged', 'true');
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('hplus_logged');
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('hplus_logged') === 'true';
    }
}
