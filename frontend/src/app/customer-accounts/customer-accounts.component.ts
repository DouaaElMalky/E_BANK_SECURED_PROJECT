import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service'; // Import the AccountsService
import { Customer } from '../model/customer.model';
import { AccountDetails } from '../model/account.model'; // Import the AccountDetails model

@Component({
  selector: 'app-customer-accounts',
  standalone: false,
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: Customer;
  accounts: AccountDetails[] = []; // To store the list of accounts
  loading: boolean = true; // To manage the loading state

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountsService: AccountsService // Inject the AccountsService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id']; // snapshot : la route actuelle
    this.getCustomerAccounts(); // Fetch accounts when component is initialized
  }

  // Method to fetch customer accounts
  getCustomerAccounts(): void {
    this.accountsService.getCustomerAccounts(this.customerId).subscribe(
      (data) => {

        this.accounts = data; // Store the fetched accounts in the component's state
        console.log(data);
        this.loading = false; // Set loading to false after fetching the data
      },
      (error) => {
        console.error('Error fetching customer accounts', error);
        this.loading = false; // Handle error and set loading to false
      }

    );


  }
  // Function to view operations for the selected account
  viewOperations(accountId: string): void {
    // Navigate to a route that shows the account operations
    this.router.navigate(['/admin/account-operations', accountId]);
  }
}
