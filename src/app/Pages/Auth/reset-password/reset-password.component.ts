import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/Auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { passwordMatchValidator } from '../../../Shared/password-match.directive';
import { UpdatedPassword, UpdtdPassword } from '../../../interfaces/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'], // Fixed styleUrls typo
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnInit() {
    // Retrieve the token from the URL query parameters
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  get password() {
    return this.resetPasswordForm.controls['password'];
  }

  get confirmPassword() {
    return this.resetPasswordForm.controls['confirmPassword'];
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.password.value;

      const updatedPassword: UpdtdPassword = {
        Password: newPassword,
      };

      // Send the token along with the new password to the backend
      this.authService.resetPassword(this.token, updatedPassword).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password Successfully Reset',
          });
          this.router.navigate(['login']);
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
    }
  }
}
