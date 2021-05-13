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
	public allProducts: IProduct [] 	= Products;
	public productsFilter: any  = [];
	public brands: any = [];
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
		this._ModalController.dismiss(false);
	}

	public openCart(): void {
		this._ModalController.dismiss(true);
	}

	public openDetail(data): void {
		this._ModalController.dismiss(data);
	}

	public filterBrands(brandAux: string): void {
		if(brandAux != 'Todos'){
			//let data =	this.allProducts.find(t=>t.brand === brandAux);
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



}
