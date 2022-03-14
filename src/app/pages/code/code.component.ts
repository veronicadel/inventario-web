import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  todo: FormGroup;
  isValid = false;

  constructor(private formBuilder: FormBuilder,
              private utilService: UtilService,
              public router: Router,
              public http: HttpClient,) {
    this.todo = this.formBuilder.group({
      code: [''],
      email: ['', [Validators.required, Validators.pattern(environment.regexEmail)]],
    });
  }

  ngOnInit() {
  }

  code() {
    this.utilService.presentLoading(true);
    if (!this.isValid){
      this.sendCode();
    }else {
      this.verifyCode();
    }

  }

  private verifyCode() {
    this.http.get(environment.url + '/client/verifyCode?email=' + this.todo.controls.email.value)
      .subscribe(
        () => {
          this.utilService.presentLoading(false);
          localStorage.setItem('email', this.todo.controls.email.value)
          this.router.navigate(['restore']);
        }
        , error => {
          this.utilService.presentAlert(error.error.message);
          this.utilService.presentLoading(false);
        })
  }

  private sendCode() {
    this.http.get(environment.url + '/client/sendCode?email=' + this.todo.controls.email.value)
      .subscribe(
        () => {
          this.utilService.presentLoading(false);
          this.todo.controls.code.setValidators([Validators.required]);
          this.todo.controls.code.updateValueAndValidity()
          this.isValid = true;
        }
        , error => {
          this.isValid = false;
          this.utilService.presentAlert(error.error.message);
          this.utilService.presentLoading(false);
        })
  }
}
