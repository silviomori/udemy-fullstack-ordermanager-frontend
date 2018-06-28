import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/domain/state.service';
import { CityService } from '../../services/domain/city.service';
import { StateDTO } from '../../models/state.dto';
import { CityDTO } from '../../models/city.dto';

@IonicPage()

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  formGroup: FormGroup;
  statesDTO: StateDTO[];
  citiesDTO: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public stateService: StateService,
    public cityService: CityService) {

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

  ionViewDidLoad() {
    this.stateService.fetchAll()
      .subscribe(
        response => {
          this.statesDTO = response;
          this.formGroup.controls.stateId.setValue(this.statesDTO[0].id);
          this.updateCities();
        },
        error => {}
      );
  }

  updateCities() {
    let stateId = this.formGroup.value.stateId;
    this.cityService.fetchAll(stateId)
      .subscribe(
        response => {
          this.citiesDTO = response;
          this.formGroup.controls.cityId.setValue(null);
        },
        error => {}
      );
  }

  signupUser() {
    console.info("signupUser()");
  }
}
