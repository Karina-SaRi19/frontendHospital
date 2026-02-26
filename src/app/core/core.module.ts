import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { OfflinePageComponent } from './components/offline-page/offline-page.component';

@NgModule({
  declarations: [
    OfflinePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    OfflinePageComponent
  ]
})
export class CoreModule { }