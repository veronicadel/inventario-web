import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'codes',
    loadChildren: () => import('./pages/code/code.module').then( m => m.CodeModule)
  },
  {
    path: 'restore',
    loadChildren: () => import('./pages/restore/restore.module').then( m => m.RestoreModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
