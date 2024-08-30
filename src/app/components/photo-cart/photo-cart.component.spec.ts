import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCartComponent } from './photo-cart.component';

describe('PhotoCartComponent', () => {
  let component: PhotoCartComponent;
  let fixture: ComponentFixture<PhotoCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
