import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../Shared/password-match.directive';
import { AuthService } from '../../Services/Auth/auth.service';
import { UpdatedPassword } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent {
  loading = false;
  updatePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.updatePasswordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  get oldPassword() {
    return this.updatePasswordForm.controls['oldPassword'];
  }

  get password() {
    return this.updatePasswordForm.controls['password'];
  }

  get confirmPassword() {
    return this.updatePasswordForm.controls['confirmPassword'];
  }

  OnSubmit() {
    this.loading = true;
    // const pwd = this.password.value;
    if (this.updatePasswordForm.valid) {
      const oldPassword = this.oldPassword.value;
      const newPassword = this.password.value;

      const updatedPassword: UpdatedPassword = {
        OldPassword: oldPassword,
        NewPassword: newPassword,
      };
      this.authService.updateUserPassword(updatedPassword).subscribe(
        (response) => {
          this.loading = false;
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password Successfully Updated',
          });
          this.router.navigate(['login']);
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
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
