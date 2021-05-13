import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { IProduct } from '../../../interfaces/product/iProduct';
import { Products } from '../../../models/products/products';
@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.page.html',
  styleUrls: ['./filter-product.page.scss'],
})
export class FilterProductPage implements OnInit {
	@ViewChild(IonSlides, {static: false}) slides: IonSlides;
	public allProducts: 		any 	= [Products];
	public productsFilter: 	any  	= [];
	public brands: 					any 	= [];
	public favoriteData: 		any 	= [];
	public favoriteStruct:	any		= {dataFavorite: false, dataId: 0, flag: false}
	public slideOpt1 = {
    direction: 'horizontal',
    slidesPerView: 1
  }
  constructor(private _NavParams: NavParams, private _ModalController: ModalController) { }

  ngOnInit() {
		this.allProducts = this._NavParams.get('value')
		this.productsFilter = this.allProducts;
		let ids = this.allProducts.map(o => o.brand)
		this.brands = this.allProducts.filter(({brand}, index) => !ids.includes(brand, index + 1))
		this.brands.push({brand: "Todos"})
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

	public openDetail(data): void {
		this.favoriteStruct.flag=null;
		this.favoriteStruct['dataDetail']=data
		this.favoriteData.push(this.favoriteStruct);
		this._ModalController.dismiss(this.favoriteData);
	}

	public filterBrands(brandAux: string): void {
		if(brandAux != 'Todos'){
			let dataAux = [];
			this.allProducts.forEach(element => {
				if(element.brand == brandAux){
					dataAux.push(element);
				}
			});
			if(dataAux.length != 0){
				this.productsFilter = dataAux;
			}
		}else{
			this.productsFilter = this.allProducts;
		}
	}

	public addFavorite(dataFavorite: boolean, dataId: number): void {
		let index = this.allProducts.findIndex(dat => dat.id === dataId);
		if(dataFavorite){
			this.allProducts[index].is_favorite = false;
		}else{
			this.allProducts[index].is_favorite = true;
		}
		this.favoriteStruct.dataFavorite = 	dataFavorite;
		this.favoriteData.dataId = 					dataId;
		this.favoriteData.flag = 						true
		this.favoriteData.push({dataFavorite: dataFavorite, dataId: dataId, flag: true});
	}

}
