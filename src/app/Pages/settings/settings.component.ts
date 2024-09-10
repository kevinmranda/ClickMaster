import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { SelectItemGroup, SelectItem, MessageService } from 'primeng/api';
import { AuthService } from '../../Services/Auth/auth.service';
import { UserPreferences } from '../../interfaces/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  loading = false;
  receiveNotifications: boolean = false;
  groupedThemes: SelectItemGroup[];
  selectedTheme: string = 'bootstrap4-light-purple';
  languages: SelectItem[];
  selectedLanguage = 'en';

  constructor(
    private translocoService: TranslocoService,
    private themeService: ThemeService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.groupedThemes = [
      {
        label: 'Light Themes',
        items: [
          { label: 'Bootstrap 4 Light Blue', value: 'bootstrap4-light-blue' },
          {
            label: 'Bootstrap 4 Light Purple',
            value: 'bootstrap4-light-purple',
          },
          { label: 'Md Light Indigo', value: 'md-light-indigo' },
          { label: 'Md Light Deep Purple', value: 'md-light-deeppurple' },
          { label: 'MDC Light Indigo', value: 'mdc-light-indigo' },
          { label: 'MDC Light Deep Purple', value: 'mdc-light-deeppurple' },
          { label: 'Fluent Light', value: 'fluent-light' },
          { label: 'Lara Light Blue', value: 'lara-light-blue' },
          { label: 'Lara Light Indigo', value: 'lara-light-indigo' },
          { label: 'Lara Light Purple', value: 'lara-light-purple' },
          { label: 'Lara Light Teal', value: 'lara-light-teal' },
          { label: 'Soho Light', value: 'soho-light' },
          { label: 'Viva Light', value: 'viva-light' },
          { label: 'Mira', value: 'mira' },
          { label: 'Nano', value: 'nano' },
          { label: 'Saga Blue', value: 'saga-blue' },
          { label: 'Saga Green', value: 'saga-green' },
          { label: 'Saga Orange', value: 'saga-orange' },
          { label: 'Saga Purple', value: 'saga-purple' },
          { label: 'Nova', value: 'nova' },
          { label: 'Nova Alt', value: 'nova-alt' },
          { label: 'Nova Accent', value: 'nova-accent' },
          { label: 'Rhea', value: 'rhea' },
        ],
      },
      {
        label: 'Dark Themes',
        items: [
          { label: 'Bootstrap 4 Dark Blue', value: 'bootstrap4-dark-blue' },
          { label: 'Bootstrap 4 Dark Purple', value: 'bootstrap4-dark-purple' },
          { label: 'Md Dark Indigo', value: 'md-dark-indigo' },
          { label: 'Md Dark Deep Purple', value: 'md-dark-deeppurple' },
          { label: 'MDC Dark Indigo', value: 'mdc-dark-indigo' },
          { label: 'MDC Dark Deep Purple', value: 'mdc-dark-deeppurple' },
          { label: 'Lara Dark Blue', value: 'lara-dark-blue' },
          { label: 'Lara Dark Indigo', value: 'lara-dark-indigo' },
          { label: 'Lara Dark Purple', value: 'lara-dark-purple' },
          { label: 'Lara Dark Teal', value: 'lara-dark-teal' },
          { label: 'Soho Dark', value: 'soho-dark' },
          { label: 'Viva Dark', value: 'viva-dark' },
          { label: 'Vela Blue', value: 'vela-blue' },
          { label: 'Vela Green', value: 'vela-green' },
          { label: 'Vela Orange', value: 'vela-orange' },
          { label: 'Vela Purple', value: 'vela-purple' },
          { label: 'Arya Blue', value: 'arya-blue' },
          { label: 'Arya Green', value: 'arya-green' },
          { label: 'Arya Orange', value: 'arya-orange' },
          { label: 'Arya Purple', value: 'arya-purple' },
          { label: 'Luna Amber', value: 'luna-amber' },
          { label: 'Luna Blue', value: 'luna-blue' },
          { label: 'Luna Green', value: 'luna-green' },
          { label: 'Luna Pink', value: 'luna-pink' },
        ],
      },
    ];

    this.languages = [
      { label: 'English', value: 'en' },
      { label: 'Swahili', value: 'sw' },
    ];
  }

  ngOnInit() {}

  notifications(newValue: boolean) {
    this.receiveNotifications = newValue;
    // Perform any additional logic here
    this.updatePreferences(newValue, undefined, undefined);
  }

  changeTheme(theme: string) {
    if (theme && typeof theme === 'string') {
      this.themeService.switchTheme(theme);
      this.updatePreferences(undefined, theme, undefined);
      localStorage.setItem('theme', theme);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid theme selected',
      });
    }
  }

  changeLanguage(language: string) {
    if (language && typeof language === 'string') {
      this.translocoService.setActiveLang(language); // Set the active language
      this.updatePreferences(undefined, undefined, language);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid language selected',
      });
    }
  }

  updatePreferences(subscription?: boolean, theme?: string, language?: string) {
    this.loading = true;
    // Start with the current preferences
    const preferences: UserPreferences = {
      Subscription: this.receiveNotifications,
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
        this.loading = false;
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Preferences Successfully Updated',
        });
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
