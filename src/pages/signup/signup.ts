import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = formBuilder.group({
        name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        customerType : ['1', [Validators.required]],
        documentNumber : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        password : ['123', [Validators.required]],
        street : ['Rua Via', [Validators.required]],
        number : ['25', [Validators.required]],
        complement : ['Apto 3', []],
        district : ['Copacabana', []],
        zipCode : ['10828333', [Validators.required]],
        phoneNumber1 : ['977261827', [Validators.required]],
        phoneNumber2 : ['', []],
        phoneNumber3 : ['', []],
        stateId : [null, [Validators.required]],
        cityId : [null, [Validators.required]]
      });
  }

  updateCities() {
    console.info("updateCities()");
  }

  signupUser() {
    console.info("signupUser()");
  }
}
