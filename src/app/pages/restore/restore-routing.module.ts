import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestoreComponent} from "./restore.component";

const routes: Routes = [{path:'', component:RestoreComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestoreRoutingModule { }
