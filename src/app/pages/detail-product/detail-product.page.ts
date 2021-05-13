import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IProduct } from '../../../interfaces/product/iProduct';
import { Products } from '../../../models/products/products';
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
	public allProducts: IProduct[] 	= Products;
	public allProductsoffers: Array<object> = [];
	public flagScroll: boolean = false;
  constructor(private _NavParams: NavParams, private _ModalController: ModalController) { }

  ngOnInit() {
		this.allProducts = this._NavParams.get('value')
		this.myID = document.getElementById("myID");
  }

	//SE VALIDA EN QUE PUNTO ESTA EL SCROLL PARA HACER HIDDEN EL PRODUCTO Y MOSTRAR LA DESCRIPCION
	public logScrolling(event) {
    if (event.detail.scrollTop > this.lastY) {
      this.myID.className = "bottomMenu hide";
			this.flagScroll=true;
    }else {
      this.myID.className = "bottomMenu show";
			this.flagScroll=false;
    }
  }

	public back(): void {
		this._ModalController.dismiss();
	}

	public openCart(): void {
		this._ModalController.dismiss(true);
	}

}
