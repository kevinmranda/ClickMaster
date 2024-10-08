import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './Pages/Auth/forget-password/forget-password.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ProfileComponent } from './Pages/profile/profile.component';
import { UpdatePasswordComponent } from './Pages/update-password/update-password.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { PhotosComponent } from './Pages/photos/photos.component';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ScafoldComponent } from './components/scafold/scafold.component';
import { BadgeModule } from 'primeng/badge';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { ResetPasswordComponent } from './Pages/Auth/reset-password/reset-password.component';
import { ActivityLoggingComponent } from './Pages/activity-logging/activity-logging.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { OrdersComponent } from './Pages/orders/orders.component';
import { PaymentsComponent } from './Pages/payments/payments.component';
import { TagModule } from 'primeng/tag';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DividerModule } from 'primeng/divider';
import { PhotoCartComponent } from './components/photo-cart/photo-cart.component';
import { TranslocoRootModule } from './transloco-root.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    UpdatePasswordComponent,
    LandingComponent,
    PhotosComponent,
    SidebarComponent,
    ScafoldComponent,
    DeleteConfirmationComponent,
    ResetPasswordComponent,
    ActivityLoggingComponent,
    SettingsComponent,
    OrdersComponent,
    PaymentsComponent,
    GalleryComponent,
    FileUploadComponent,
    PhotoCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    MenubarModule,
    SidebarModule,
    TableModule,
    FileUploadModule,
    AvatarModule,
    RippleModule,
    StyleClassModule,
    BadgeModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    TagModule,
    DialogModule,
    DividerModule,
    HttpClientModule,
    TranslocoRootModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [MessageService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
