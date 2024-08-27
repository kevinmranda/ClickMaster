import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScafoldComponent } from './scafold.component';

describe('ScafoldComponent', () => {
  let component: ScafoldComponent;
  let fixture: ComponentFixture<ScafoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScafoldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScafoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
