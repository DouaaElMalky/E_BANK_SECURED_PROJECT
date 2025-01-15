package ma.mundia.ebankingbackend.services;

import ma.mundia.ebankingbackend.entities.AccountOperation;
import ma.mundia.ebankingbackend.repositories.AccountOperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private AccountOperationRepository accountOperationRepository;

    // Récupérer les volumes des transactions par date (jour)
    public List<Object[]> getTransactionVolumeByDate() {
        List<AccountOperation> operations = accountOperationRepository.findAll();

        // Utiliser un format de date pour extraire la date sans tenir compte de l'heure
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        // Grouper les transactions par date
        Map<String, Double> transactionVolumeByDate = operations.stream()
                .collect(Collectors.groupingBy(
                        op -> dateFormat.format(op.getOperationDate()), // Extraire la date sans l'heure
                        Collectors.summingDouble(AccountOperation::getAmount) // Calculer le volume total des transactions pour chaque date
                ));

        // Formater les données sous forme de tableau pour retourner {date, volume}
        return transactionVolumeByDate.entrySet().stream()
                .map(entry -> new Object[]{entry.getKey(), entry.getValue()})
                .collect(Collectors.toList());
    }
}
