import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.editUserForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      birthdate: [''],
      address: [''],
      mobile: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.authService.getUser().subscribe(
      (response: any) => {
        const user: User = response.data;
        // Ensure user data is present
        if (user) {
          this.editUserForm.patchValue({
            first_name: user.First_name || '',
            last_name: user.Last_name || '',
            email: user.Email || '',
            birthdate: user.Birthdate ? user.Birthdate.split('T')[0] : '',
            address: user.Address || '',
            mobile: user.Mobile || '',
          });
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load user details.',
        });
      }
    );
  }

  get control() {
    return this.editUserForm.controls;
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const updatedData = { ...this.editUserForm.value };
      this.authService.updateUser(updatedData as User).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Details Successfully Updated',
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
    }
  }
}
