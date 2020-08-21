import {Injectable, ErrorHandler} from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable()

export class MemberListResolver implements Resolve<User []>{

    constructor(private userService: UserService, private alertifyService: AlertifyService, private router: Router){}
    resolve(route: ActivatedRouteSnapshot): Observable<User []> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertifyService.error('Problem retreving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}