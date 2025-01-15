package ma.mundia.ebankingbackend.repositories;

import ma.mundia.ebankingbackend.entities.AccountOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountOperationRepository extends JpaRepository<AccountOperation, Long> {
    List<AccountOperation> findByBankAccountId(String accountId);
    Page<AccountOperation> findByBankAccountIdOrderByOperationDateDesc(String accountId, Pageable pageable);

    long count();
    @Query("SELECT SUM(a.amount) FROM AccountOperation a")
    double sumTransactionAmounts();

    @Query("SELECT new map(MONTH(a.operationDate) as month, SUM(a.amount) as totalAmount) " +
            "FROM AccountOperation a GROUP BY MONTH(a.operationDate) ORDER BY MONTH(a.operationDate)")
    List<Object[]> getTransactionVolumeByDate();
}
