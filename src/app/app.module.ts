import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeComponent } from './pages/code/code.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestoreComponent } from './pages/restore/restore.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AlertComponent } from './pages/alert/alert.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxLoadingModule} from "ngx-loading";
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { DialogProductComponent } from './pages/dialog-product/dialog-product.component';
import { DialogCategoryComponent } from './pages/dialog-category/dialog-category.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AppComponent,
    CodeComponent,
    RegisterComponent,
    RestoreComponent,
    AlertComponent,
    HomeComponent,
    DialogProductComponent,
    DialogCategoryComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
