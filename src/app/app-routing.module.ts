import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path:"",component:LoginPageComponent},
  {path:"products",component:ProductsPageComponent},
  {path:"login",component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
