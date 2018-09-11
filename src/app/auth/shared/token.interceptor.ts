import { Injectable } from '@angular/core';
import { 
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}
    intercept(request: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAuthToken();
        if(token){
            debugger
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token//Get the token here
                }
            });
        }
        

        return next.handle(request);
    }
}