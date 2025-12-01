import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CustomerService} from '../service/customer.service';

@Component({
  selector: 'app-customers.component',
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit{

  customers : any;
  constructor(private router : Router,
              private customerService : CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.customerService.GetAllCustomers().subscribe({
      next : (data) => {this.customers = data},
      error : err => {}
    });
  }

  getOrders(c: any) {
    this.router.navigateByUrl("orders/"+c.id);
  }

  delete(c: any) {
    let v = confirm('êtes vous sûre de vouloir supprimer ce Customer ?');
    if (v==true){
      this.customerService.DeleteCustomer(c).subscribe({
        next : resp =>{this.getAllCustomers()},
        error : err => {}
      });
      this.getAllCustomers();
    }
  }

  addCustomer() {
    this.router.navigateByUrl('/add-customer');
  }
}
