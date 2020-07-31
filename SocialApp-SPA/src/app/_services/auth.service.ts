import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseURL = 'https://localhost:5001/auth/';
 jwtHelper = new JwtHelperService();
 decodedToken: any;

constructor(private http: HttpClient) { }

login(model: any) {
 return this.http.post(this.baseURL + 'login', model) .pipe(
   map((resposne: any) => {
        const user = resposne;
        if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseURL + 'register', model);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
