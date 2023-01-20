import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private URL_PRO : string ='https://dummyjson.com/auth/products'
  constructor() { }
}
