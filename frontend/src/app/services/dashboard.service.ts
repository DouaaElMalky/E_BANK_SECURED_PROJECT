import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {


  constructor(private http: HttpClient) {}

  getDashboardStatistics(): Observable<any> {
    return this.http.get(environment.backendHost + "/dashboard/statistics");
  }

  getTransactionVolumeByDate(): Observable<any> {
    return this.http.get(environment.backendHost + "/dashboard/transactions");
  }
}
