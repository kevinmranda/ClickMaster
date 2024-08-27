import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLoggingComponent } from './activity-logging.component';

describe('ActivityLoggingComponent', () => {
  let component: ActivityLoggingComponent;
  let fixture: ComponentFixture<ActivityLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityLoggingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
