import { Component, OnInit } from '@angular/core';
import {UtilService} from "../../services/util.service";
import {HttpClient} from "@angular/common/http";
import {DialogCategoryComponent} from "../dialog-category/dialog-category.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'delete', 'edit'];
  dataSource: CategoryElements[] = [];

  constructor(private utilService: UtilService, public http: HttpClient, private router:Router) {
    this.utilService.validateSession();
    this.categories();
  }

  ngOnInit(): void {

  }

  add() {
    let dialog = this.utilService.dialogProduct(DialogCategoryComponent, {isType: true});
    dialog.afterClosed().subscribe((category) => {
      console.log('category', category)
      if (category) {
        let oldDataSource = [...this.dataSource];
        oldDataSource.push(category)
        this.dataSource = [];
        this.dataSource = oldDataSource;
      }
    });
  }


  categories() {
    this.utilService.presentLoading(true);
    this.http.get(environment.url + '/product/categorias')
      .subscribe(
        (cats: any) => {
          this.utilService.presentLoading(false);
          this.dataSource = cats;
        }
        , (error: any) => {
          this.utilService.presentAlert(error.error.message);
          this.utilService.presentLoading(false)
        })
  }

  delete(id: number) {
    this.utilService.presentLoading(true);
    this.http.delete(environment.url + '/product/delete?id=' + id)
      .subscribe(
        (data:any) => {
          let oldDataSource = [...this.dataSource];
          this.dataSource = [];

          for (let i = 0; i < oldDataSource.length; i++) {

            if (oldDataSource[i].id === id) {

              oldDataSource.splice(i, 1);
            }
          }
          this.dataSource = oldDataSource;
          this.utilService.presentAlert(data.message, 'Exito');
          this.utilService.presentLoading(false);
        }
        , (error: any) => {
          this.utilService.presentAlert(error.error.message);
          this.utilService.presentLoading(false)
        })
  }

  edit(element: CategoryElements) {
    element.isType = false;
    let dialog = this.utilService.dialogProduct(DialogCategoryComponent, element);
    dialog.afterClosed().subscribe((category) => {
      if (category) {
        let oldDataSource = [...this.dataSource];
        this.dataSource = [];
        this.dataSource = oldDataSource.map(cat => {
          if (cat.id === category.id) {
            cat.descripcion = category.descripcion;
            cat.nombre_categoria = category.nombre_categoria;
          }
          return cat;
        })
      }
    });
  }

  return() {
    this.router.navigate(['home'])
  }
}

export interface CategoryElements {
  id?: number;
  nombre_categoria?: string;
  descripcion?: number;
  isType: boolean;
}
