package ma.mundia.ebankingbackend.web;

import lombok.extern.slf4j.Slf4j;
import ma.mundia.ebankingbackend.services.BankAccountService;
import ma.mundia.ebankingbackend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@Slf4j
public class DashboardController {

    @Autowired
    private BankAccountService bankAccountService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/statistics")
    public Map<String, Object> getDashboardStatistics() {
        Map<String, Object> statistics = new HashMap<>();

        try {

            long totalCustomers = bankAccountService.getTotalCustomers();
            long totalAccounts = bankAccountService.getTotalAccounts();
            long totalTransactions = bankAccountService.getTotalTransactions();
            double transactionVolume = bankAccountService.getTransactionVolume();

            statistics.put("totalCustomers", totalCustomers);
            statistics.put("totalAccounts", totalAccounts);
            statistics.put("totalTransactions", totalTransactions);
            statistics.put("transactionVolume", transactionVolume);

        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques : ", e);
        }

        return statistics;
    }

    @GetMapping("/transactions")
    public List<Object[]> getTransactionVolumeByDate() {
        try {
            return transactionService.getTransactionVolumeByDate();
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des volumes des transactions par date : ", e);
            return null;
        }
    }
}