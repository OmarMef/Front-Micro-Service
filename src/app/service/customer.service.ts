import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  constructor(private http : HttpClient) {}

  GetAllCustomers(){
    return this.http.get("http://localhost:8888/customer-service/api/customers");
  }

  DeleteCustomer(customer : any){
    return this.http.delete("http://localhost:8888/customer-service/api/customers/"+customer.id);
  }

  AddCustomer(customer : any){
    return this.http.post("http://localhost:8888/customer-service/api/customers",customer);
  }

}
