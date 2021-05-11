import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../providers/user/user.service';
import { IUser } from '../../../interfaces/user/iUser';
import { User } from '../../../models/user/user';
@Component({
  selector: 'app-home-shopping-cart',
  templateUrl: './home-shopping-cart.page.html',
  styleUrls: ['./home-shopping-cart.page.scss'],
})
export class HomeShoppingCartPage implements OnInit {

	public userProfile: IUser = User;
  constructor(private _UserService: UserService) { }

  ngOnInit() {
		console.log(':D');
		console.log(this.userProfile)
		console.log(this.userProfile.fullName)
		this.callUserProfile();
  }

	public callUserProfile(): void {
		this._UserService.getUserProfile().then((dataResponse)=>{
			let dataAux = JSON.parse(dataResponse.data)
			if(dataAux.ok == true){
				this.userProfile=dataAux.data;
				console.log(this.userProfile)
			}
		}).catch((error)=>{
			console.log(error)
		})
	}

}
