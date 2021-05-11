import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeShoppingCartPage } from './home-shopping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: HomeShoppingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeShoppingCartPageRoutingModule {}
