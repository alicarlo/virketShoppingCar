import { Component, OnInit } from '@angular/core';

//USER
import { UserService } from '../../../providers/user/user.service';
import { IUser } from '../../../interfaces/user/iUser';
import { User } from '../../../models/user/user';
//Products
import { ProductsService } from '../../../providers/products/products.service';
import { IProduct } from '../../../interfaces/product/iProduct';
import { Products } from '../../../models/products/products';
//Cart
import { CartService } from '../../../providers/cart/cart.service'
import { Cart } from '../../../models/cart/cart';
//
import { ModalController, ToastController } from '@ionic/angular';
//Pages
import { DetailProductPage } from '../detail-product/detail-product.page';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart.page';
import { FilterProductPage } from '../filter-product/filter-product.page';

@Component({
  selector: 'app-home-shopping-cart',
  templateUrl: './home-shopping-cart.page.html',
  styleUrls: ['./home-shopping-cart.page.scss'],
})
export class HomeShoppingCartPage implements OnInit {

	public userProfile: IUser 		= User;
	public allProducts: IProduct[] 	=  [Products];
	public allCart: 		any = Cart;
	public allProductsoffers: Array<object> = [];
	public flags: 			any = {flagSkeleton: 0} 
	public slideOpt1 = {
    direction: 'horizontal',
    slidesPerView: 1.4
  }
	public rating:                any;
  public raitingView:           boolean = false;
  public raitingFinal:          any =0;
  constructor(private _UserService: UserService, private _ProductsService: ProductsService, private _ModalController: ModalController, 
		private _CartService: CartService, private _ToastController: ToastController) { }

  ngOnInit() {
		this.getCartAll();
		this.callAllProducts();
  }

	//SE LLAMA EL SERVICIO DEL USUARIO
	public callUserProfile(): void {
		this._UserService.getUserProfile().then((dataResponse)=>{
			let dataAux = JSON.parse(dataResponse.data)
			if(dataAux.ok == true){
				this.userProfile=dataAux.data;
				console.log(this.userProfile)
				this.validOffers().then((dataResponse)=>{
					this.splitFullNameCreate(this.userProfile.fullName).then((flagRespond)=>{
						if(flagRespond){
							this.flags.flagSkeleton=1;
						}
					})
				})
			}
		}).catch((error)=>{
			console.log(error)
		})
	}

	//SE LLAMA EL SERVICIO DE LOS PRODUCTOS
	public callAllProducts(): void {
		this._ProductsService.getAllProducts().then((dataResponse)=>{
			let dataAux = JSON.parse(dataResponse.data)
			if(dataAux.ok == true){
				this.allProducts=dataAux.data;
				this.callUserProfile();
			}
		}).catch((error)=>{
			console.log(error)
		})
	}

	//SE SEPARA EL FULLNAME A NAME PARA LA PRESENTACION DEL USUARIO
	public splitFullNameCreate(fullName: string): Promise<any>{
		return new Promise ((resolve, reject)=>{
			let splitFullName = fullName.split(" ");
			this.userProfile['name']= splitFullName[0];
			resolve(true);
		})
	}

	//SE VALIDAN QUE PRODUCTOS ESTAN EN OFERTA
	public validOffers(): Promise<any>{
		return new Promise ((resolve)=>{
			this.allProducts.forEach((element)=>{
				if(parseInt(element.discount) > 0){
					element['priceDiscount'] 		= parseFloat(element.product_price) + parseFloat(element.discount);
					element['priceFinal'] 		= parseFloat(element.product_price) + parseFloat(element.discount);
					element['product_priceInt']	= parseFloat(element.product_price);
					this.allProductsoffers.push(element)
				}
				element['priceFinal'] 		= element.product_price;
			})
			resolve(true);
		})
	}

	//MODAL DE DETALLE DEL PRODUCTO
	async detailProduct(dataProduct: object) {
    let modal = await this._ModalController.create({
      component:  DetailProductPage,
      componentProps: { value: dataProduct },
    });
    modal.onDidDismiss().then((result)=>{
			if(result.data[0].flag == true  ){
				console.log(result.data[0].dataId )
				if(result.data[0].dataId>0){
					this.addFavorite(result.data.dataFavorite, result.data.id);;
				}
			}else
			if(result.data[0].flag == false){
				if(result.data[0].dataId>0){
					this.addFavorite(result.data.dataFavorite, result.data.id);
					this.shoppingCart();
				}else{
					this.shoppingCart();
				}
			}
    })
    return await modal.present();
  }

	//MODAL DE LAS COMPRAS
	async shoppingCart(){
    let modal = await this._ModalController.create({
      component:  	ShoppingCartPage,
    });
    modal.onDidDismiss().then((result)=>{
    })
    return await modal.present();
  }

	//MODAL DONDE SE FILTRA POR MARCA LOS PRODUCTOS
	async filerProduct(){
    let modal = await this._ModalController.create({
      component:  	FilterProductPage,
      componentProps: { value: this.allProducts },
    });
    modal.onDidDismiss().then((result)=>{
			if(result.data[0].flag == true  ){
				console.log(result.data[0].dataId )
				if(result.data[0].dataId>0){
					this.addFavorite(result.data.dataFavorite, result.data.id);
				}
			}else
			if(result.data[0].flag == false){
				if(result.data[0].dataId>0){
					this.addFavorite(result.data.dataFavorite, result.data.id);
					this.shoppingCart();
				}else{
					this.shoppingCart();
				}
			}else
			if(result.data[0].flag == null){
				this.detailProduct(result.data[0].dataDetail);
			}
    })
    return await modal.present();
  }

	//SE LLAMA EL SERVICIO DE LAS COMPRAS PARA ALMACENAR LOS DATOS Y UTILIZARLOS EN CUALQUIER COMPONENTE
	public getCartAll(): void {
		this._CartService.getCartClient().then((dataResponse)=>{
			let dataAux = JSON.parse(dataResponse.data)
			if(dataAux.ok == true){
				this._CartService.setCart(dataAux.data);
				this.allCart = this._CartService.getCart();
			}
		})
	}

	public addFavorite(dataFavorite: boolean, dataId: number): void {
		let index = this.allProducts.findIndex(dat => dat.id === dataId);
		if(dataFavorite){
			this.allProducts[index].is_favorite = false;
		}else{
			this.allProducts[index].is_favorite = true;
		}
	}

	public addProduct(data): void {
		data['color'] = data.colors;
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
