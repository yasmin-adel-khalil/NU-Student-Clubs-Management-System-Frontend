import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // TODO: Handle different error codes
        console.error('HTTP Error:', error);
        
        if (error.status === 401) {
          // Unauthorized - redirect to login
        } else if (error.status === 403) {
          // Forbidden - show access denied message
        } else if (error.status === 404) {
          // Not found
        } else if (error.status >= 500) {
          // Server error
        }

        return throwError(() => error);
      })
    );
  }
}
