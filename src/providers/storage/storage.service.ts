import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _NativeStorage: NativeStorage) { }


	public setFlagTutorial(flagTutorial: boolean): Promise<any>{
		return new Promise ((resolve, reject)=>{
			this._NativeStorage.setItem('tutorial', {flag: flagTutorial}).then((data)=>{
				resolve(true)
			}).catch((error)=>{
				//console.log(error);
				reject(false)
			})
		}).catch((error)=>{
			//console.log(error);
			return false;
		})
  }

	public getFlagTutorial(): Promise<any>{
		return new Promise ((resolve,reject)=>{
			this._NativeStorage.getItem('tutorial').then((dataResponse)=>{
				resolve(dataResponse.flag)
			}).catch((error)=>{
				reject(false)
			})
		}).catch((error)=>{
			return false;
		})
	}
}
