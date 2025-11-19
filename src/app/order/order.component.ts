import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order.component',
    imports: [
        DatePipe
    ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit{

  orders : any;
  customerId! :number;

  constructor(private http : HttpClient ,
              private router : Router,
              private route : ActivatedRoute) {this.customerId=route.snapshot.params['customerId'];}

  ngOnInit(): void {
    this.http.get("http://localhost:8888/order-service/api/orders/search/byCustomerId?projection=fullOrder&customerId="+this.customerId)
      .subscribe({
        next : (data) =>{this.orders = data},
        error : err => {}
      });
  }


  getOrdersDetails(o: any) {
    this.router.navigateByUrl("order-details/"+o.id);
  }


}
