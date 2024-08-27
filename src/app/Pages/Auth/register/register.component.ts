import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../Shared/password-match.directive';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';
import { User } from '../../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.authService = authService;
    this.registerForm = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        birthdate: ['', Validators.required],
        address: [''],
        mobile: [
          '',
          [Validators.required, Validators.pattern('^\\+255[0-9]{9}$')],
        ],
      },
      { validators: passwordMatchValidator }
    );
  }

  get control() {
    return this.registerForm.controls;
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account created successfully',
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
