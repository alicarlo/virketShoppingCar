import { Component, OnInit } from '@angular/core';
//USER
import { UserService } from '../../../providers/user/user.service';
import { IUser } from '../../../interfaces/user/iUser';
import { User } from '../../../models/user/user';
//Products
import { ProductsService } from '../../../providers/products/products.service';
import { IProduct } from '../../../interfaces/product/iProduct';
import { Products } from '../../../models/products/products';



@Component({
  selector: 'app-home-shopping-cart',
  templateUrl: './home-shopping-cart.page.html',
  styleUrls: ['./home-shopping-cart.page.scss'],
})
export class HomeShoppingCartPage implements OnInit {

	public userProfile: IUser 		= User;
	public allProducts: IProduct[] 	= Products;
	public allProductsoffers: Array<object> = [];
	public flags: 			any = {flagSkeleton: 0} 
	public slideOpt1 = {
    direction: 'horizontal',
    slidesPerView: 1.4
  }
	public rating:                any;
  public raitingView:           boolean = false;
  public raitingFinal:          any =0;
  constructor(private _UserService: UserService, private _ProductsService: ProductsService) { }

  ngOnInit() {
		console.log(':D');
		console.log(this.userProfile)
		console.log(this.userProfile.fullName)
		//this.callUserProfile();
		this.callAllProducts();
  }

	public callUserProfile(): void {
		this._UserService.getUserProfile().then((dataResponse)=>{
			let dataAux = JSON.parse(dataResponse.data)
			if(dataAux.ok == true){
				this.userProfile=dataAux.data;
				console.log(this.userProfile)
				this.validOffers().then((dataResponse)=>{
					console.log('offers')
					console.log(this.allProducts)
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

	public callAllProducts(): void {
		this._ProductsService.getAllProducts().then((dataResponse)=>{
			let dataAux = JSON.parse(dataResponse.data)
			if(dataAux.ok == true){
				this.allProducts=dataAux.data;
				console.log(this.allProducts)
				//this.allProducts
				this.callUserProfile();
			}
		}).catch((error)=>{
			console.log(error)
		})
	}

	public splitFullNameCreate(fullName: string): Promise<any>{
		return new Promise ((resolve, reject)=>{
			let splitFullName = fullName.split(" ");
			this.userProfile['name']= splitFullName[0];
			resolve(true);
		})
	}

	public validOffers(){
		//allProducts['offers'] = a => a.foo  //a = 
		//this.allProducts['offers'] = 
		//this.allProducts['offers'];
		return new Promise ((resolve)=>{
			this.allProducts.forEach((element)=>{
				if(parseInt(element.discount) > 0){
					element['priceDiscount'] 		= parseFloat(element.product_price) + parseFloat(element.discount);
					element['product_priceInt']	= parseFloat(element.product_price);
					this.allProductsoffers.push(element)
				}
			})
			resolve(true);
		})
	

	}

}
