import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../Services/Auth/auth.service';
import { User } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.authService.getUser().subscribe(
      (response: any) => {
        const user: User = response.data;
        this.username = user.First_name + ' ' + user.Last_name;
      },
      (error) => {
        console.log('Error loading user details', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
