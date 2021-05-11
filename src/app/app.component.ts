import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { StorageService } from '../providers/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _Platform: Platform, private _NavController: NavController, private _StorageService : StorageService ) {
		this.initializeApp()
	}

	initializeApp() {
    this._Platform.ready().then(() => {
			this._StorageService.getFlagTutorial().then((dataRespose)=>{
				if(dataRespose == false){
					this._NavController.navigateRoot("tutorial")
				}else{
					this._NavController.navigateRoot("home-shopping-cart")
				}
			}).catch((error)=>{
				this._NavController.navigateRoot("tutorial")
				console.log(error)
			})
    });
  }
}
