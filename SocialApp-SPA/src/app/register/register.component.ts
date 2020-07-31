import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input valueFromHome is an input property that will take values in from parent component.
  // [valueFromHome] use square bracs for @input prop in html
  // It is use for comunication from parent component to child component.It will hold data from parent component(home)

  //  @Output cancelRegister is an output property that will pass the value out from child component(register)
  // Using this in cancel method which is an event emitter so is initilize it as new EventEmitter(); object
  // (cancelRegister) use round bracs for @Output prop in html
  // It is use for comunication from child component to parent component.It will hold data from child component(register)

  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any ={};

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('Registered successfully');
    }, error => {
      this.alertifyService.error(error);
    })
  }

  cancel(){
    // emit means release/clear somthing
    this.cancelRegister.emit(false);
    this.alertifyService.error('cancelled');
  }

}
