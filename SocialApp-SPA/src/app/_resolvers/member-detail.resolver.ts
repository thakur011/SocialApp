import {Injectable, ErrorHandler} from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';

// Proper solution:Route resolver is used to make our data load before the route component activated
// Else it will throw error
// Temporary solution for this is make the props optional by adding ? with each one.
@Injectable()

export class MemberDetailResolver implements Resolve<User>{

    constructor(private userService: UserService, private alertifyService: AlertifyService, private router: Router){}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retreving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

}