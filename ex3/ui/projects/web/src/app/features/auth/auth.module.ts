import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from '@saanbo/common/core/guards/authorized.guard';

import { CommonSharedModule } from '@saanbo/common/shared/common-shared.module';

import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [authorizedGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [authorizedGuard] },
  { path: 'confirm-password', component: ConfirmResetPasswordComponent, canActivate: [authorizedGuard] },
];

/** Authorization module. */
@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonSharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
