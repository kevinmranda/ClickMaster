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
  },
  {
    path: 'forgotPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'photos',
    component: PhotosComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'logs',
    component: ActivityLoggingComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
