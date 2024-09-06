import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ClickMaster';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Fetch the current preferences from local storage and handle null
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme != null) {
      // Apply the theme using the ThemeService
      this.themeService.switchTheme(storedTheme);
    }
  }
}
