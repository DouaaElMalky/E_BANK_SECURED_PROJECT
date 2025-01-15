import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-account-operations',
  templateUrl: './account-operations.component.html',
  styleUrls: ['./account-operations.component.css'],
  standalone: false
})
export class AccountOperationsComponent implements OnInit {
  accountId: string | null = null;
  operations: any[] = [];
  filteredOperations: any[] = [];
  loading: boolean = true; // To manage the loading state
  searchTerm: string = ''; // For operation type filter
  startDate: string = '';  // Start date for filtering
  endDate: string = '';    // End date for filtering

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    // Get the accountId from the route parameters
    this.accountId = this.route.snapshot.paramMap.get('accountId');

    // Fetch operations for the account
    if (this.accountId) {
      this.fetchOperations(this.accountId);
    }
  }

  fetchOperations(accountId: string): void {
    this.accountsService.getAccountOperations(accountId).subscribe(
      (data) => {
        this.operations = data;
        this.filteredOperations = [...this.operations]; // Initially show all operations
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching operations', error);
      }
    );
  }

  // Method to filter operations based on date range and operation type
  filterOperations(): void {
    this.filteredOperations = this.operations.filter((operation) => {
      let isWithinDateRange = true;

      // Filter by date range
      if (this.startDate) {
        isWithinDateRange = new Date(operation.operationDate) >= new Date(this.startDate);
      }
      if (this.endDate) {
        isWithinDateRange = isWithinDateRange && new Date(operation.operationDate) <= new Date(this.endDate);
      }

      // Filter by operation type (if search term is provided)
      const matchesSearchTerm = this.searchTerm
        ? operation.type.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return isWithinDateRange && matchesSearchTerm;
    });
  }
}
