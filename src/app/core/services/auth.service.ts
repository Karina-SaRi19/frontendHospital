import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, LoginRequest, LoginResponse, ExchangeResponse } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Solo guardamos info no sensible del usuario (sin token)
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private userKey = 'h-moscatti-user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Solo recuperamos el usuario, nunca el token
    const storedUser = localStorage.getItem(this.userKey);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  // Paso 1 — crea la sesión en el Auth Server
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.authUrl}/api/auth/login`,
      credentials,
      { withCredentials: true } // necesario para sesión OAuth2
    );
  }

  // Paso 2 — inicia el flujo OAuth2, redirige al Auth Server
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
        withCredentials: true // el navegador guarda la cookie automáticamente
      }
    ).pipe(
      tap(response => {
        // Guardamos solo info del usuario, el token está en la cookie
        const user: User = {
          idUsuario: response.idUsuario,
          correo: response.correo,
          rol: response.rol
        };
        this.setUser(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  // Logout — borra cookie en el backend y limpia el frontend
  logout(): void {
    this.http.post(
      `${environment.authUrl}/api/auth/logout`,
      {},
      { withCredentials: true }
    ).subscribe({
      complete: () => {
        this.removeUser();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        // Aunque falle, limpiamos el frontend igual
        this.removeUser();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private removeUser(): void {
    localStorage.removeItem(this.userKey);
  }
}