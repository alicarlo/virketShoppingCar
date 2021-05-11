import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiUrlService } from '../apiUrl/api-url.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HTTP: HTTP, private _ApiUrlService: ApiUrlService) { }

	public getUserProfile():Promise<any> {
    let api = this._ApiUrlService.apiUrl+this._ApiUrlService.apis[0];
		console.log(api);
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
