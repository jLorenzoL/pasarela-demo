import { Product } from './../models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : Product [] = [
    new Product(1,'Spiderman', 'lorem Impsun', 150.0, 'https://images-na.ssl-images-amazon.com/images/I/71dtn2ZMs7L._SL1361_.jpg'),
    new Product(2,"Marvel's Avengers", 'lorem Impsun', 120.0, 'https://images-na.ssl-images-amazon.com/images/I/81DugevkxJL._SL1500_.jpg'),
    new Product(3,'The Last of Us Part II', 'lorem Impsun', 140.0, 'https://images-na.ssl-images-amazon.com/images/I/71p8G%2BYeA6L._SL1500_.jpg'),
    new Product(4,'God of War Hits', 'lorem Impsun', 130.0, 'https://images-na.ssl-images-amazon.com/images/I/813xlI-NGpL._SL1500_.jpg'),
    new Product(5,"Assassin's Creed Valhalla", 'lorem Impsun', 140.0, 'https://images-na.ssl-images-amazon.com/images/I/819zQmqyDcL._SL1500_.jpg'),
    new Product(6,'Cyberpunk 2077', 'lorem Impsun', 150.0, 'https://images-na.ssl-images-amazon.com/images/I/81iR0aGNJ5L._SL1500_.jpg')
  ]

  constructor() { }

  getProducts() : Product[]{
    return this.products;
  }
}
