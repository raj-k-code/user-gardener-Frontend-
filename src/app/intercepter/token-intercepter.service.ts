import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class TokenIntercepterService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let tokenizedRequest = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
    return next.handle(tokenizedRequest);
  }
}
