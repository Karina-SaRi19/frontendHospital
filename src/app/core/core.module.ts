import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        AuthGuard
    ]
})
export class CoreModule { }