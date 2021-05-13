import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiUrlService } from '../apiUrl/api-url.service';
import { Cart } from '../../models/cart/cart';
import { ICart } from '../../interfaces/cart/iCart'

@Injectable({
  providedIn: 'root'
})
export class CartService {

	public allCart: object = Cart;
  constructor(private _HTTP: HTTP, private _ApiUrlService: ApiUrlService) { }

	//SE OBTIENEN LOS PRODUCTOS DEL CARRITO
	public getCartClient():Promise<any> {
    let api = this._ApiUrlService.apiUrl+this._ApiUrlService.apis[2];
    return new Promise ((resolve,reject)=>{
      this._HTTP.setDataSerializer('json');
      this._HTTP.get(api,'',this._ApiUrlService.httpOptions).then(data=>{
          resolve(data);
      }).catch((error)=>{
          reject(error); 
      });
    }).catch((error)=>{
      return error;
    });
  }

	public setCart(dataCart: any): void {
		this.allCart = dataCart;
	}

	public getCart(): object {
		return this.allCart;
	}

}
