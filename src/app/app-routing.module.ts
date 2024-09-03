import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './Pages/Auth/forget-password/forget-password.component';
import { UpdatePasswordComponent } from './Pages/update-password/update-password.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { PhotosComponent } from './Pages/photos/photos.component';
import { ResetPasswordComponent } from './Pages/Auth/reset-password/reset-password.component';
import { ActivityLoggingComponent } from './Pages/activity-logging/activity-logging.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { PaymentsComponent } from './Pages/payments/payments.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'updatePassword',
    component: UpdatePasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgotPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'photos',
    component: PhotosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'logs',
    component: ActivityLoggingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
