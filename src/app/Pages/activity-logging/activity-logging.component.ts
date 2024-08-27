import { Component } from '@angular/core';
import { Logs } from '../../interfaces/logs';
import { LogsService } from '../../Services/Pages/Logs/logs.service';

@Component({
  selector: 'app-activity-logging',
  templateUrl: './activity-logging.component.html',
  styleUrl: './activity-logging.component.css',
})
export class ActivityLoggingComponent {
  logs: Logs[] = [];
  constructor(private logService: LogsService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.logService.getLogs().subscribe((response) => {
      this.logs = response;
    });
  }
}
