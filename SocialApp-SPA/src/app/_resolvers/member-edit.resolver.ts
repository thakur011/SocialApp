import {Injectable, ErrorHandler} from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

// Proper solution:Route resolver is used to make our data load before the route component activated
// Else it will throw error
// Temporary solution for this is make the props optional by adding ? with each one.
@Injectable()

export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService, private alertifyService: AlertifyService,
                private router: Router,private authService: AuthService){}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retreving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

}