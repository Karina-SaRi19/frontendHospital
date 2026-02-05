import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    constructor(private authService: AuthService) { }

    logout(): void {
        this.authService.logout();
    }
}
