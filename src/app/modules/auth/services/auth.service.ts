import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

export interface User {
  idUsuario: number;
  correo: string;
  rol: 'MEDICO' | 'PACIENTE';
}

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface ExchangeResponse {
  rol: 'MEDICO' | 'PACIENTE';
  idUsuario: number;
  correo: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userKey = 'h-moscatti-user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem(this.userKey);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  // Paso 1 — crea la sesión en el Auth Server
  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(
      `${environment.authUrl}/api/auth/login`,
      credentials,
      { withCredentials: true }
    );
  }

  // Paso 2 — redirige al Auth Server para obtener el código OAuth2
  redirectToAuthorize(): void {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: environment.clientId,
      redirect_uri: environment.redirectUri,
      scope: 'read write'
    });
    window.location.href = `${environment.authUrl}/oauth2/authorize?${params}`;
  }

  // Paso 3 — intercambia el código por la cookie HttpOnly
  exchangeCode(code: string): Observable<ExchangeResponse> {
    return this.http.get<ExchangeResponse>(
      `${environment.authUrl}/api/auth/exchange-code`,
      {
        params: { code },
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        const user: User = {
          idUsuario: response.idUsuario,
          correo: response.correo,
          rol: response.rol
        };
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  // Logout — borra cookie en backend y limpia frontend
  logout(): void {
    this.http.post(
      `${environment.authUrl}/api/auth/logout`,
      {},
      { withCredentials: true }
    ).subscribe({
      complete: () => this.clearSession(),
      error: () => this.clearSession()
    });
  }

  private clearSession(): void {
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
}