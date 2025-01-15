import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-edit-customer',
  standalone: false,
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer!: Customer; // Customer à éditer
  customerId! : string;

  constructor(private route : ActivatedRoute, private router : Router,private customerService: CustomerService,
              private fb: FormBuilder,)
   {this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;}

  ngOnInit(): void {
    // Récupérer les données du client passé via l'état de la navigation
    this.customerId = this.route.snapshot.params['id'];
    if (!this.customer) {
      this.router.navigate(['/admin/customers']);
    } else {
      // Initialiser le formulaire avec les données du client
      this.customerForm = this.fb.group({
        name: [{ value: this.customer?.name, disabled: true }], // Champ du nom désactivé
        email: [this.customer?.email, [Validators.required, Validators.email]]
      });
    }
  }

  handleUpdateCustomer(): void {
    if (this.customerForm.valid) {
      const updatedCustomer = { ...this.customer, email: this.customerForm.value.email };
      this.customerService.updateCustomer(updatedCustomer).subscribe({
        next: () => {
          this.router.navigate(['/admin/customers']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
