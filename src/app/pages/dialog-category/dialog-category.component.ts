import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {UtilService} from "../../services/util.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {

  todo: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogCategoryComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public http: HttpClient,
              public utilService: UtilService) {
    this.todo = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.data.data.isType){
      this.todo.controls.name.setValue(this.data.data.nombre_categoria);
      this.todo.controls.description.setValue(this.data.data.descripcion);
      console.log('this.data.nombre_categoria', this.data)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  category() {
    let body = {
      id: !this.data.data.isType ? this.data.data.id : null,
      nombre_categoria: this.todo.controls.name.value,
      descripcion: this.todo.controls.description.value,
    }
    this.utilService.presentLoading(true);
    this.http.post(environment.url + '/product/guardarCategoria', body).subscribe(category => {
      this.utilService.presentLoading(false);
      this.dialogRef.close(category);
    }, error => {
      this.utilService.presentLoading(false);
      this.utilService.presentAlert(error.error.message);
    })
  }
}
