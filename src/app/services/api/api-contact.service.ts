import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiContactService {

  constructor(private http:HttpClient) { }
  url = "https://localhost:5001/api/Products";
  
  getProducts():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.url);
  }

  deleteProducts(id:number){
    return this.http.delete("https://localhost:5001/api/Products/"+id)
  }

  createProducts(product:Product){
    return this.http.post("https://localhost:5001/api/Products/create",product)
  }
  
  updateProducts(id:number, product:Product){
    return this.http.put("https://localhost:5001/api/Products/"+id,product)
  }
}


