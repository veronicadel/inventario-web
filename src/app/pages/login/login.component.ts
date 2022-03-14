import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public todo: FormGroup;

  constructor(public router: Router,
              public http: HttpClient,
              private formBuilder: FormBuilder,
              public utilService:UtilService
              ) {
    this.todo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(environment.regexEmail)]],
      password: ['',  [Validators.required, Validators.pattern(environment.regexPassword)]],
    });
  }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['register']);
  }

  loginHome() {
    this.utilService.presentLoading(true);
    this.http.get(environment.url + '/client/login?email='+ this.todo.controls.email.value + '&password='+  this.todo.controls.password.value )
      .subscribe(
        (user:any) => {
          this.utilService.presentLoading(false)
          this.router.navigateByUrl('home');
          localStorage.setItem('user', JSON.stringify(user));
          this.utilService.setLogin(true);
        }
        , (error: any) =>  {
         this.utilService.presentAlert(error.error.message);
          this.utilService.presentLoading(false)
        })
  }

  codes() {
    this.router.navigate(['codes']);
  }
}
