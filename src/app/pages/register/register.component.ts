import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UtilService} from "../../services/util.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  todo: FormGroup;

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              public http: HttpClient,
              public utilService:UtilService) {

    this.todo = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(environment.regexEmail)]],
      password: ['', [Validators.required, Validators.pattern(environment.regexPassword)]],
      telephone: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  logForm() {
    let body = {
      id: null,
      nombre: this.todo.controls.name.value,
      aPaterno: this.todo.controls.lastName.value,
      amaterno: this.todo.controls.firstName.value,
      email: this.todo.controls.email.value,
      password: this.todo.controls.password.value,
      telefono: this.todo.controls.telephone.value,
      terminos: true,
      foto: null,
      direction: null
    }
    this.utilService.presentLoading(true);
    this.http.post(environment.url + '/client/guardar', body).subscribe(user => {
      this.utilService.presentLoading(false);
      this.router.navigate(['']);
    }, error => {
      this.utilService.presentLoading(false);
      this.utilService.presentAlert(error.error.message);
    })
  }

  login() {
    this.router.navigate(['']);
  }
}
