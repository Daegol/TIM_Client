import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}

export const AddHeaderInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true
};
