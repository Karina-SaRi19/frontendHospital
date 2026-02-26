import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectivityService } from '../../services/connectivity.service';

@Component({
  selector: 'app-offline-page',
  templateUrl: './offline-page.component.html',
  styleUrls: ['./offline-page.component.scss']
})
export class OfflinePageComponent {
  constructor(
    private router: Router,
    private connectivityService: ConnectivityService
  ) {}

  tryReconnect(): void {
    if (this.connectivityService.isOnline) {
      this.router.navigate(['/dashboard']);
    } else {
      window.location.reload();
    }
  }
}