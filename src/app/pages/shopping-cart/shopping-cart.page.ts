import { Component, OnInit } from '@angular/core';
//Cart
import { CartService } from '../../../providers/cart/cart.service'
import { Cart } from '../../../models/cart/cart';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

	public allCart: any = Cart;
  constructor(private _CartService: CartService, private _ModalController: ModalController) { }

  ngOnInit() {
		this.allCart = this._CartService.getCart();
		console.log(this.allCart)
  }

	public back(){
		console.log('entro')
		this._ModalController.dismiss();
	}

}
