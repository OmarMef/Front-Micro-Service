import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http :HttpClient) {}

  GetAllProducts() {
    return this.http.get("http://localhost:8888/inventory-service/api/products");
  }

  DeleteProducts(product : any){
    return this.http.delete("http://localhost:8888/inventory-service/api/products/"+product.id);
  }

  AddProduct(product : any){
    return this.http.post("http://localhost:8888/inventory-service/api/products",product);
  }

}
