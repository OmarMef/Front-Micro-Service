import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-order-details.component',
  imports: [
    DatePipe,
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit{

  orderDetails : any ;
  orderId !: number;

  constructor(private http : HttpClient,
              private router : Router,
              private route : ActivatedRoute) {this.orderId=route.snapshot.params['orderId'];}

  ngOnInit(): void {
    this.http.get("http://localhost:8084/orders/"+this.orderId)
      .subscribe({
        next : (data) => {this.orderDetails=data},
        error : err => {}
      });
  }

}
