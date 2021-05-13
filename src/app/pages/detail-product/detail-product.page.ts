import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { IProduct } from '../../../interfaces/product/iProduct';
import { Products } from '../../../models/products/products';
import { CartService } from '../../../providers/cart/cart.service'
import { Cart } from '../../../models/cart/cart';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

	//IDENTIFICADORES PARA LA ANIMACION DE SCROLL
	public myID : any;
  public myID2: any;
	//IDENTIFICADOR DE SCROLL TOP
  private lastY: 			number = 5;
	public allProducts: any 	= Products;
	public allProductsoffers: Array<object> = [];
	public cartProducts 	= Cart
	public flagScroll: boolean = false;
	public favoriteData: any = [];
	public allCart: 		any = Cart;
	public favoriteStruct:	any		= {dataFavorite: false, dataId: 0, flag: false}
  constructor(private _NavParams: NavParams, private _ModalController: ModalController, private _ToastController: ToastController, private _CartService: CartService) { }

  ngOnInit() {
		this.allProducts = this._NavParams.get('value')
		this.myID = document.getElementById("myID");
  }

	//SE VALIDA EN QUE PUNTO ESTA EL SCROLL PARA HACER HIDDEN EL PRODUCTO Y MOSTRAR LA DESCRIPCION
	public logScrolling(event): void {
    if (event.detail.scrollTop > this.lastY) {
      this.myID.className = "bottomMenu hide";
			this.flagScroll=true;
    }else {
      this.myID.className = "bottomMenu show";
			this.flagScroll=false;
    }
  }

	public back(): void {
		if(this.favoriteData.length != 0){
			this.favoriteStruct.flag = true;
			this._ModalController.dismiss(this.favoriteData);
		}else{
			this.favoriteStruct.flag = true;
			this.favoriteData.push(this.favoriteStruct);
			this._ModalController.dismiss(this.favoriteData);
		}
	}

	public openCart(): void {
		if(this.favoriteData.length != 0){
			this.favoriteStruct.flag=false;
			this._ModalController.dismiss(this.favoriteData);
		}else{
			this.favoriteStruct.flag=false;
			this.favoriteData.push(this.favoriteStruct);
			this._ModalController.dismiss(this.favoriteData);
		}
	}

	public addFavorite(dataFavorite: boolean, dataId: number): void {
		if(dataFavorite){
			this.allProducts.is_favorite = false;
		}else{
			this.allProducts.is_favorite = true;
		}
		this.favoriteData.push({dataFavorite: dataFavorite, dataId: dataId});
	}

	public addProduct(data): void {
		data['color'] = data.colors;
		this.allCart = this._CartService.getCart();
		this.allCart.products.push(data)
		this._CartService.setCart(this.allCart);
		this.presentToast();
	}

	async presentToast() {
    const toast = await this._ToastController.create({
      message: 'Producto agregado correctamente',
      duration: 2000
    });
    toast.present();
  }

}
