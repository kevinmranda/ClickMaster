import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css',
})
export class DeleteConfirmationComponent {
  constructor(
    private messageService: MessageService,
    private AuthService: AuthService,
    private router: Router
  ) {}
  visible: boolean = false;

  showConfirm() {
    if (!this.visible) {
      this.messageService.add({
        key: 'confirm',
        sticky: true,
        severity: 'danger',
        summary:
          'This action is irreversible. Are you certain that you want to delete this Account?',
      });
      this.visible = true;
    }
  }

  onClose() {
    this.visible = false;
  }

  deleteAccount() {
    this.AuthService.deleteUser().subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account Deleted successful',
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
