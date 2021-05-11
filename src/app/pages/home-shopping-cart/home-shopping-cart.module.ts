import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeShoppingCartPageRoutingModule } from './home-shopping-cart-routing.module';

import { HomeShoppingCartPage } from './home-shopping-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeShoppingCartPageRoutingModule
  ],
  declarations: [HomeShoppingCartPage]
})
export class HomeShoppingCartPageModule {}
