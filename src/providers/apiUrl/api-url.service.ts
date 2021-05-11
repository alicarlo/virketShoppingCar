import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  apis: Array<any> = [
    /*0 User*/ "82b8143c-f08a-4c55-b84f-05bc502d5c08", /*1 All Products*/ "11f7165c-ea13-4ca6-8748-ca8bf94b5de5", /*3 Cart*/ "b54da230-99a1-48a0-b826-9b2f50a2bbb7"
  ]
  public apiUrl:        string;
  public httpOptions:   object;
  constructor() { 
    this.apiUrl = 'https://run.mocky.io/v3/';
    this.httpOptions = {'Content-type': 'application/json; charset=UTF-8'};
  }
}
