import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private authService : AuthService, ) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(httpRequest.url)
    if (!httpRequest.url.includes("/auth/login")){
      let newRequest = httpRequest.clone({
        headers : httpRequest.headers.set('Authorization', 'Bearer ' +this.authService.accessToken)
      })
      return next.handle(newRequest).pipe(
        catchError(err => {
          if (err.status == 401){
            this.authService.logout();
          }
          return throwError(err)
        })
      );
    } else {
      return next.handle(httpRequest)
    }

  }
}
