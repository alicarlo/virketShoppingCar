import { Component, OnInit } from '@angular/core';
//Cart
import { CartService } from '../../../providers/cart/cart.service'
import { Cart } from '../../../models/cart/cart';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

	public allCart: any = Cart;
  constructor(private _CartService: CartService, private _ModalController: ModalController, private _ToastController: ToastController) { }

  ngOnInit() {
		this.allCart = this._CartService.getCart();
		this.calculateTotalFirst();
  }

	public calculateTotalFirst(): void {	
		this.allCart.subtotal = "0";
		if(this.allCart != null ||  this.allCart != undefined){
			this.allCart.products.forEach(element => {
				this.allCart.subtotal =  parseFloat(this.allCart.subtotal) + parseFloat(element.product_price) 
			});
		}

		if(parseFloat(this.allCart.subtotal) == 0){
			this.allCart.shipping = "0";
		}else{
			this.allCart.shipping = "150";
		}
		this.allCart.total = parseFloat(this.allCart.shipping) + parseFloat(this.allCart.subtotal);
	}

	public back(): void {
		this._ModalController.dismiss();
	}

	public removeProduct(data){
		let index = this.allCart.products.findIndex(dat => dat.id === data);
		this.allCart.products.splice(index, 1);
		this._CartService.setCart(this.allCart);
		this.calculateTotalFirst();
		this.presentToast();
	}

	async presentToast() {
    const toast = await this._ToastController.create({
      message: 'Producto eliminado correctamente',
      duration: 2000
    });
    toast.present();
  }

}
