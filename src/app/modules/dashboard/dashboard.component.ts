import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ConnectivityService } from '../../core/services/connectivity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    public connectivityService: ConnectivityService
  ) { }

  logout(): void {
    this.authService.logout();
  }
}