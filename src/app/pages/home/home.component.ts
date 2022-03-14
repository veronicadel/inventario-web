import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private router:Router, private utilService:UtilService) {
    this.utilService.validateSession();
  }

  ngOnInit(): void {
  }


  category() {
    this.router.navigate(['category'])
  }

  product() {
    this.router.navigate(['product'])
  }
}

