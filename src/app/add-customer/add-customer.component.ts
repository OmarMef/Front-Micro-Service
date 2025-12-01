import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomerService} from '../service/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-customer.component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent implements OnInit{

  customerForm !: FormGroup;
  constructor(private customerService : CustomerService,
              private fb : FormBuilder,
              private router : Router) {}

  ngOnInit(): void {
      this.customerForm = this.fb.group({
        id: [{ value: '', disabled: true }],  // ID généré par Spring → readonly
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      })
  }

  addCustomer() {
    if(this.customerForm.valid){
      this.customerService.AddCustomer(this.customerForm.value).subscribe({
        next : value => {
          alert('Customer ajouté avec succès.')
          this.router.navigateByUrl('/customers')
        },
        error : err => {
          console.error('Erreur lors de l’ajout du customer', err);
          alert('Erreur lors de l’ajout. Vérifiez la console.');
        }
      });
    }else
      alert('Veuillez remplir correctement tous les champs.')
  }
}
