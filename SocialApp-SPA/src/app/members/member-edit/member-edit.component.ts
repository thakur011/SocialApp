import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
user: User;
// We can use a method on form it self to reset the form.
// @viewChild decorator is used to access the form.
// @ViewChild=>Decorator ('editForm'(Form reference variable), {static: true}) editForm(name of it): NgForm(Type of it) ;
// This will give us the access to all the form methods.
@ViewChild('editForm', {static: true}) editForm: NgForm;

// @HostListener decorator has ability to listen to our host in our case it is a browser.
// It take action on bases something happening inside our browser.
@HostListener('window:beforeunload', ['$event'])
          unloadNotification ($event: any) {
            if (this.editForm.dirty) {
                $event.returnValue = true;
            }
}
  constructor(private route: ActivatedRoute, private alertifyService: AlertifyService ,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit () {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
  }
  updateUser (){
    this.userService.updateUser(this.authService.decodedToken.nameid , this.user).subscribe(next => {
      this.alertifyService.success('Profile updated successfully');
      // reset() form method will reset all the form including the button to its initial state like disable
      // reset(this.user) form method will reset all the form with the data how it is saved.
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    });

  }

}
