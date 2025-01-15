import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../services/dashboard.service";
import { Chart } from 'highcharts';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCustomers: number = 0;
  totalAccounts: number = 0;
  totalTransactions: number = 0;
  transactionVolume: number = 0;

  chartOptions: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardStatistics();
    this.getTransactionVolumeByDate();
  }



  // Récupérer les statistiques du Dashboard
  getDashboardStatistics(): void {
    this.dashboardService.getDashboardStatistics().subscribe({
      next: (data) => {
        this.totalCustomers = data.totalCustomers;
        this.totalAccounts = data.totalAccounts;
        this.totalTransactions = data.totalTransactions;
        this.transactionVolume = data.transactionVolume;
      },
      error: (err) => {
        console.error("Error fetching dashboard statistics: ", err);
      }
    });
  }

  // Récupérer les volumes des transactions par date
  getTransactionVolumeByDate(): void {
    this.dashboardService.getTransactionVolumeByDate().subscribe({
      next: (data) => {
        // Convertir les dates en objets Date et trier les données par date
        const sortedData = data.map((item: any) => {
          return {
            date: new Date(item[0]), // Convertir la date en format Date
            volume: item[1]
          };
        }).sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => a.date.getTime() - b.date.getTime()); // Trier par date

        // Extraire les dates triées et les volumes
        const dates = sortedData.map((item: { date: { toLocaleDateString: () => any; }; }) => item.date.toLocaleDateString());
        const volumes = sortedData.map((item: { volume: any; }) => item.volume);

        console.log('Sorted Data:', sortedData);
        console.log('Dates:', dates);
        console.log('Volumes:', volumes);


        // Configurer les options du graphique
        // this.chartOptions = {
        //   chart: {
        //     type: 'line'
        //   },
        //   title: {
        //     text: 'Volume des Transactions par Date'
        //   },
        //   xAxis: {
        //     categories: dates, // Utiliser les dates triées
        //     title: {
        //       text: 'Date'
        //     }
        //   },
        //   yAxis: {
        //     title: {
        //       text: 'Volume'
        //     }
        //   },
        //   series: [{
        //     name: 'Volume des Transactions',
        //     data: volumes
        //   }]
        // };

      },
      error: (err) => {
        console.error("Error fetching transaction volume data: ", err);
      }
    });
  }

  protected readonly Highcharts = Highcharts;
}
