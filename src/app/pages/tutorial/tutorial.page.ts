import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { StorageService } from '../../../providers/storage/storage.service'
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private _StorageService: StorageService, private _NavController:  NavController) { }

  ngOnInit() {

  }
	
	public firstTutorial(): void {
		this._StorageService.setFlagTutorial(true).then((dataResponse)=>{
			this.navigateHome();
		}).catch((error)=>{
			console.log('error'+error);
			this.navigateHome();
		})
	}

	public navigateHome(): void {
		this._NavController.navigateRoot("home-shopping-cart");
	}

}
