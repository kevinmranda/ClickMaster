import { Component } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { SelectItemGroup, SelectItem, MessageService } from 'primeng/api';
import { AuthService } from '../../Services/Auth/auth.service';
import { UserPreferences } from '../../interfaces/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  receiveNotifications: boolean = false;
  groupedThemes: SelectItemGroup[];
  selectedTheme: string = 'aura-dark-amber.css';
  languages: SelectItem[];
  selectedLanguage = 'en';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.groupedThemes = [
      {
        label: 'Light Themes',
        items: [
          { label: 'Bootstrap', value: 'bootstrap4-light-purple' },
          { label: 'Md', value: 'md-light-indigo' },
          { label: 'Saga', value: 'saga-blue' },
        ],
      },
      {
        label: 'Dark Themes',
        items: [
          { label: 'Bootstrap', value: 'bootstrap4-dark-purple' },
          { label: 'Md', value: 'md-dark-indigo' },
          { label: 'Vela', value: 'vela-blue' },
          { label: 'Arya', value: 'arya-blue' },
        ],
      },
    ];

    this.languages = [
      { label: 'English', value: 'en' },
      { label: 'Swahili', value: 'sw' },
    ];
  }

  changeTheme(theme: string) {
    if (theme && typeof theme === 'string') {
      this.themeService.switchTheme(theme);
      this.updatePreferences(this.receiveNotifications, theme, undefined);
    } else {
      console.error('Invalid theme selected:', theme);
    }
  }

  changeLanguage(language: string) {
    this.updatePreferences(this.receiveNotifications, undefined, language);
  }

  updatePreferences(subscription?: boolean, theme?: string, language?: string) {
    // Start with existing preferences or defaults
    const preferences: UserPreferences = {
      Subscription: this.receiveNotifications, // This holds the current preferences
      Theme: this.selectedTheme,
      Language: this.selectedLanguage,
    };

    // Update only the provided preferences
    if (subscription !== undefined) {
      preferences.Subscription = subscription;
    }
    if (theme !== undefined && theme !== '') {
      preferences.Theme = theme;
    }
    if (language !== undefined && language !== '') {
      preferences.Language = language;
    }

    this.authService.updateUserPreferences(preferences).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Preferences Successfully Updated',
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
