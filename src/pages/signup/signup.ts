import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { StateService } from '../../services/domain/state.service';
import { CityService } from '../../services/domain/city.service';
import { StateDTO } from '../../models/state.dto';
import { CityDTO } from '../../models/city.dto';
import { CustomerService } from '../../services/domain/customer.service';

@IonicPage()

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  statesDTO: StateDTO[];
  citiesDTO: CityDTO[];

  formGroup: FormGroup;
  address: FormGroup;
  phoneNumbers: FormArray;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public stateService: StateService,
    public cityService: CityService,
    public customerService: CustomerService,
    public alertCtrl: AlertController) {

    this.address = this.formBuilder.group({
      street : ['Rua Via', [Validators.required]],
      number : ['25', [Validators.required]],
      complement : ['Apto 3', []],
      district : ['Copacabana', []],
      zipCode : ['10828333', [Validators.required]],
      cityId : [null, [Validators.required]]
    });

    this.phoneNumbers = this.formBuilder.array([
      ['977261827', [Validators.required]],
      ['', []],
      ['', []]
    ]);

    this.formGroup = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      customerType: ['1', [Validators.required]],
      documentNumber: ['061.345.962-80', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      addresses: this.formBuilder.array([
        this.address
      ]),
      phoneNumbers: this.phoneNumbers,
      stateId: [null, [Validators.required]]
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
          this.address.controls.cityId.setValue(null);
        },
        error => {}
      );
  }

  signupUser() {
    this.customerService.insert(this.formGroup.value)
      .subscribe(
        response => { this.showSingUpOk() },
        error => {}
      );
  }

  showSingUpOk() {
    let alert = this.alertCtrl.create(
      {
        title: "Success!",
        message: "Your account has been created successfully.",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK',
            handler: () => { this.navCtrl.pop(); }
          }
        ]
      }
    );
    alert.present();
  }

}
