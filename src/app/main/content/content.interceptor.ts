import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1MGU0OTdkYS1kOTFjLTRiNDEtOWZkZi03MDcyYjcyZGJkMGEiLCJ1c2VySWQiOiJmNGRjZDg4OC04YTQwLTQ3OTYtOWFmYS02YmI1MmViZGM1ZGMiLCJzcGFjZUlkIjoiODZmZjc4NjYtZjg0Ny00NjI4LWI3NWMtNWYxYTc4ODk5YzM1IiwiaWF0IjoxNjA5ODU2MDE4LCJleHAiOjE2MTI0NDgwMTgsImF1ZCI6ImF1ZGllbmNlIiwiaXNzIjoiMzY2IE9wbGVpZGluZ3NwbGF0Zm9ybSIsInN1YiI6ImluZm9AMzY2Lm5sIn0.sYbS01P6J0BfFG5ja44-nJS9DPADcxQGupfm0wA4F7A';

        const headers = new HttpHeaders().set("Authorization", API_TOKEN);
        const AuthReq = request.clone({
            headers: headers
        });
        return next.handle(AuthReq);
    }
}