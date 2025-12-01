import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products.component',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit{

  products : any;
  constructor(private productService : ProductService,
              private router : Router) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.productService.GetAllProducts().subscribe({
      next : (data) => {this.products = data},
      error : err => {}
    });
  }

  delete(product :any) {
    let v = confirm('êtes vous sûre de vouloir supprimer le produit ?')
    if (v == true) {
      this.productService.DeleteProducts(product).subscribe({
        next: resp => {this.getAllProducts()},
        error : err => {console.log(err)}
      })
    this.getAllProducts()
    }
  }

  addProduct() {
    this.router.navigateByUrl('/add-product')
  }
}
