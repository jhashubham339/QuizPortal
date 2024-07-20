import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // Get the token from localStorage
      const token = this.loginService.getToken();
      let authRequest = request;
      if(token!=null){
        authRequest = authRequest.clone({setHeaders :{ Authorization:`Bearer ${token}`}});
      }
    return next.handle(authRequest);
  }
}


// In the AppModule.ts we have to add this.

// providers: [ {
//   provide: HTTP_INTERCEPTORS,
//   useClass: AuthInterceptor,
//   multi: true
// },]
