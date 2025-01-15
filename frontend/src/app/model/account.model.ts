export interface AccountDetails {
  type: string;
  id:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  status: string;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
