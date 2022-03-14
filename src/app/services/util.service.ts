import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertComponent} from "../pages/alert/alert.component";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public loading = new Subject<boolean>();
  public isLogin = new Subject<boolean>();

  constructor(private dialog: MatDialog, private router:Router) {
  }

  presentAlert(message: string, title = 'A ocurrido un error'): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: {title: title, message: message},
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  presentLoading(active: boolean) {
    this.loading.next(active);
  }

  getLoading() {
    return this.loading.asObservable();
  }

  setLogin(active: boolean) {
    this.isLogin.next(active);
  }

  getLogin() {
    return this.isLogin.asObservable();
  }

  dialogProduct(component: any, data: any = '') {
    return this.dialog.open(component, {
      width: '500px',
      data: {data: data},
    });
  }

  validateSession(){
    if (!localStorage.getItem('user')){
      this.router.navigate([''])
    }
  }
}
