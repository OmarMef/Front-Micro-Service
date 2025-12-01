import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-add-product.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  standalone: true
})
export class AddProductComponent implements OnInit{


  productForm !: FormGroup;
  constructor(private productService : ProductService,
              private router :Router,
              private fb : FormBuilder) {}


  ngOnInit(): void {

    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name : ['' , Validators.required],
      price : [0,[Validators.required,Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    })
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productService.AddProduct(this.productForm.value).subscribe({
        next : () => {
          alert('Produit ajouté avec succès !');
          this.router.navigateByUrl('/products');
        },
        error : err => {
          console.error('Erreur lors de l’ajout du produit', err);
          alert('Erreur lors de l’ajout. Vérifiez la console.');
        }
      });
    }else
      alert('Veuillez remplir correctement tous les champs.');

  }
}
