package ma.mundia.ebankingbackend.services;

import jakarta.transaction.Transactional;
import ma.mundia.ebankingbackend.entities.BankAccount;
import ma.mundia.ebankingbackend.entities.CurrentAccount;
import ma.mundia.ebankingbackend.entities.SavingAccount;
import ma.mundia.ebankingbackend.repositories.AccountOperationRepository;
import ma.mundia.ebankingbackend.repositories.BankAccountRepository;
import ma.mundia.ebankingbackend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private CustomerRepository customerRepository;

    private BankAccountRepository bankAccountRepository;

    private AccountOperationRepository accountOperationRepository;

    public long getTotalCustomers() {
        return customerRepository.count();
    }

    public long getTotalAccounts() {
        return bankAccountRepository.count();
    }

    public long getTotalTransactions() {
        return accountOperationRepository.count();
    }

    public double getTransactionVolume() {
        return accountOperationRepository.sumTransactionAmounts();  // Implémentation de la méthode dans AccountOperationRepository
    }

}
