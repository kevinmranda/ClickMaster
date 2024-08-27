import { Component } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { UserEmail } from '../../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  email?: string;

  constructor(
    private AuthService: AuthService,
    private messageService: MessageService
  ) {}
  sendEmail() {
    if (this.email) {
      const emailPayload = { Email: this.email };
      this.AuthService.sendResetPasswordEmail(emailPayload).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Reset Password Email Sent',
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.error,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email field is empty',
      });
    }
    this.email = '';
  }
}
