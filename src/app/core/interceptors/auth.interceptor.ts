import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ya no necesitamos leer el token — la cookie viaja automáticamente
    // Solo agregamos withCredentials a todas las peticiones
    const authReq = request.clone({
      withCredentials: true
    });
    return next.handle(authReq);
  }
}