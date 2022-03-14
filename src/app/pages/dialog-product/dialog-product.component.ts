import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UtilService} from "../../services/util.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('fileImage') fileImage: ElementRef<HTMLElement>;

  todo: FormGroup;
  base64: any = null;
  categories: any[]= [];
  constructor(public dialogRef: MatDialogRef<DialogProductComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public http: HttpClient,
              public utilService: UtilService) {
    this.todo = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category:['', Validators.required]
    });

  }

  ngOnInit(): void {
    if (!this.data.data.isType){
      this.todo.controls.name.setValue(this.data.data.nombre);
      this.todo.controls.description.setValue(this.data.data.descripccion);
      this.todo.controls.price.setValue(this.data.data.precio);
      this.todo.controls.stock.setValue(this.data.data.stock);
      this.todo.controls.category.setValue(this.data.data.category.id);
      this.base64 = this.data.data.foto;
      console.log('this.data.nombre_categoria', this.data)
    }
  }

  ngAfterViewInit(): void {
    this.categoriesList()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  categoriesList() {
    this.utilService.presentLoading(true);
    this.http.get(environment.url + '/product/categorias')
      .subscribe(
        (cats: any) => {
          this.utilService.presentLoading(false);
          this.categories = cats;
        }
        , (error: any) => {
          this.utilService.presentAlert(error.error.message);
          this.utilService.presentLoading(false)
        })
  }


  product() {
    // @ts-ignore
    let body = {
      id: !this.data.data.isType ? this.data.data.id : null,
      nombre: this.todo.controls.name.value,
      descripccion: this.todo.controls.description.value,
      precio:this.todo.controls.price.value,
      stock:this.todo.controls.stock.value,
      foto:this.base64,
      category: this.categories.find(element => element.id === this.todo.controls.category.value)
    }

    this.utilService.presentLoading(true);
    this.http.post(environment.url + '/product/guardarProducto', body).subscribe(product => {
      this.utilService.presentLoading(false);
      this.dialogRef.close(product);
    }, error => {
      this.utilService.presentLoading(false);
      this.utilService.presentAlert(error.error.message);
    })
  }

  async change(event: any) {
    let tgt = event.target;
    this.base64 = await  this.base64Convert(tgt);
    console.log('base 64', this.base64)
  }

  private base64Convert(tgt: any) {

    return new Promise((resolve, reject) => {
      let files = tgt.files;
      if (FileReader && files && files.length) {
        let fr = new FileReader();
        fr.onload = function () {
          let base64 = fr.result;
          resolve(base64);
        }
        fr.readAsDataURL(files[0]);
      } else {
        reject('error');
      }
    })

  }

  upload() {
    let el: HTMLElement = this.fileImage.nativeElement;
    el.click();
  }
}
