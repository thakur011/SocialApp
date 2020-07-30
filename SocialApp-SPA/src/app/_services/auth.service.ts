import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseURL = 'https://localhost:5001/auth/';

constructor(private http: HttpClient) { }

login(model: any) {
 return this.http.post(this.baseURL + 'login', model) .pipe(
   map((resposne: any) => {
        const user = resposne;
        if (user) {
            localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseURL + 'register', model);
  }
}
