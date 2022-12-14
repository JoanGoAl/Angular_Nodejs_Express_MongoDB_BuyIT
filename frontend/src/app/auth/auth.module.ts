import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register.component';
import { NoAuthGuard } from '../core/services';
import { SharedModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        RegisterComponent,
        LoginComponent
    ],
    providers: [
        NoAuthGuard
    ]
})
export class AuthModule { }
