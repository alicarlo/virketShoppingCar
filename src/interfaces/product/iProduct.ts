export interface IProduct{
	id:							number,
	sku:						string,
	brand:					string,
	product_name:		string,
	product_image:	string,
	product_price:	string,
	discount:				string,
	is_favorite:		boolean,
	score:					number,
	description:		string,
	colors:					Array<colors>,
	reviews:				string
}

export interface colors{	
	name:	string
	hex:	string
}