package ma.mundia.ebankingbackend.repositories;

import ma.mundia.ebankingbackend.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    long count();

    @Query("SELECT TYPE(b) AS type, COUNT(b) " +
            "FROM BankAccount b " +
            "GROUP BY TYPE(b)")
    List<Object[]> countBankAccountsByType();
    List<BankAccount> findByCustomerId(Long customerId);

}
