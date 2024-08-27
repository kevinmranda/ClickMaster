import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { AuthService } from '../../Services/Auth/auth.service';
import { User } from '../../interfaces/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  sidebarVisible: boolean = false;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  username: string = '';

  constructor(private authService: AuthService) {}

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
}
