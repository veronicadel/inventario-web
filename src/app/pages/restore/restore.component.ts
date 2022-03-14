import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {

  todo: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private utilService: UtilService,
              public router: Router,
              public http: HttpClient,) {
    this.todo = this.formBuilder.group({
      password: ['',[Validators.required, Validators.pattern(environment.regexPassword)]],
      confirmPassword: ['', Validators.required],
    },{
      validators: this.match('password', 'confirmPassword')
    });
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      // @ts-ignore
      if (checkControl.errors && !checkControl.errors.matching) {
        return null;
      }

      // @ts-ignore
      if (control.value !== checkControl.value) {
        // @ts-ignore
        controls.get(checkControlName).setErrors({matching: true});
        return {matching: true};
      } else {
        return null;
      }
    };
  }
  ngOnInit() {
  }

  restorePassword() {
    let body = {
      email: localStorage.getItem('email'),
      password: this.todo.controls.password.value,
    }
    this.utilService.presentLoading(true);
    this.http.post('http://env-9339100.whelastic.net/client/restorePassword', body).subscribe(() => {
      this.utilService.presentLoading(false);
      localStorage.removeItem('email');
      this.router.navigate(['']);
    }, error => {
      this.utilService.presentLoading(false);
      this.utilService.presentAlert(error.error.message);
    })
  }
}
