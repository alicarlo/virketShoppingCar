import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiUrlService } from '../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HTTP: HTTP, private _ApiUrlService: ApiUrlService) { }

	//SE OBTIENEN TODOS LOS PRODUCTOS
	public getAllProducts():Promise<any> {
    let api = this._ApiUrlService.apiUrl+this._ApiUrlService.apis[1];
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
}
