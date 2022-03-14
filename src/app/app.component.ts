import { Component } from '@angular/core';
import {UtilService} from "./services/util.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  loading: boolean = false;
  isLogin: boolean = false;

  constructor(private util:UtilService, private router: Router) {
    this.util.getLoading().subscribe(next => this.loading =  next );
    this.util.getLogin().subscribe(next=> this.isLogin = next);
    if( localStorage.getItem('user')) {
      this.router.navigate(['home']);
      this.isLogin = true;
    }
  }

  close() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
    this.isLogin = false;
  }
}
