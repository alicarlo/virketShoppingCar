import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _NativeStorage: NativeStorage) { }


	//SE ALMACENA UNA BANDERA PARA IDENTIFICAR SI EL USURAUO ACEPTO EL TUTORIAL INICIAL
	public setFlagTutorial(flagTutorial: boolean): Promise<any>{
		return new Promise ((resolve, reject)=>{
			this._NativeStorage.setItem('tutorial', {flag: flagTutorial}).then((data)=>{
				resolve(true)
			}).catch((error)=>{
				reject(false)
			})
		}).catch((error)=>{
			return false;
		})
  }

	//SE OBTIENE LA BANDERA DE IDENTIFICACION DEL TUTORIAL
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
