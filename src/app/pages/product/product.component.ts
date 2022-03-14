import { Component, OnInit } from '@angular/core';
import {UtilService} from "../../services/util.service";
import {HttpClient} from "@angular/common/http";
import {DialogProductComponent} from "../dialog-product/dialog-product.component";
import {environment} from "../../../environments/environment";
import {CategoryElements} from "../category/category.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description','price', 'stock', 'category', 'delete', 'edit'];
  dataSource: [] = [];

  constructor(private utilService: UtilService, public http: HttpClient, private router:Router) {
    this.utilService.validateSession();
    this.products()
  }

  ngOnInit(): void {

  }

  add() {
    let dialog = this.utilService.dialogProduct(DialogProductComponent, {isType: true});
    dialog.afterClosed().subscribe((product) => {
      if (product) {
        let oldDataSource = [...this.dataSource];
        // @ts-ignore
        oldDataSource.push(product)
        this.dataSource = [];
        // @ts-ignore
        this.dataSource = oldDataSource;
      }
    });
  }

  products() {
    this.utilService.presentLoading(true);
    this.http.get(environment.url + '/product/productos')
      .subscribe(
        (prods: any) => {
          this.utilService.presentLoading(false);
          this.dataSource = prods;
        }
        , (error: any) => {
          this.utilService.presentAlert(error.error.message);
          this.utilService.presentLoading(false)
        })
  }

  delete(id: number) {
    this.utilService.presentLoading(true);
    this.http.delete(environment.url + '/product/deleteProducto?id=' + id)
      .subscribe(
        (data:any) => {
          let oldDataSource:ProductElements[] = [...this.dataSource];
          this.dataSource = [];

          for (let i = 0; i < oldDataSource.length; i++) {

            if (oldDataSource[i].id === id) {

              oldDataSource.splice(i, 1);
            }
          }
          // @ts-ignore
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
    let dialog = this.utilService.dialogProduct(DialogProductComponent, element);
    dialog.afterClosed().subscribe((product: ProductElements) => {
      if (product) {
        let oldDataSource = [...this.dataSource];
        this.dataSource = [];
        // @ts-ignore
        this.dataSource = oldDataSource.map((prod:ProductElements) => {
          if (prod.id === product.id) {
            prod.nombre = product.nombre
            prod.precio = product.precio
            prod.stock= product.stock
            prod.foto= product.foto
            prod.descripccion= product.descripccion
            prod.category= product.category
          }
          return prod;
        })
      }
    });
  }

  return() {
    this.router.navigate(['home'])
  }
}
export interface ProductElements {
  id?: number;
  nombre?:string;
  precio?:string;
  stock?: string
  foto?:string;
  descripccion?: string;
  category?: any;
  isType: boolean;
}
