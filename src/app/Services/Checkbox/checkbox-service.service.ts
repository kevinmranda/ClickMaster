import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckboxStateService {
  private checkboxState = new BehaviorSubject<boolean>(false); // Initial state set to false
  currentCheckboxState = this.checkboxState.asObservable();

  updateCheckboxState(state: boolean) {
    this.checkboxState.next(state);
  }

  resetCheckboxState() {
    this.checkboxState.next(false); // Uncheck checkboxes
  }
}
