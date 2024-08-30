import {
  animate,
  style,
  transition,
  trigger,
  AnimationEvent,
} from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photos } from '../../Pages/photos/photos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  animations: [
    trigger('animations', [
      transition('void => visible', [
        style({ transform: 'scale(0.5)' }),
        animate('150ms', style({ transform: 'scale(1)' })),
      ]),
      transition('visible => void', [
        style({ transform: 'scale(1)' }),
        animate('150ms', style({ transform: 'scale(0.5)' })),
      ]),
    ]),
    trigger('animations2', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('50ms', style({ opacity: 0.8 })),
      ]),
    ]),
  ],
})
export class GalleryComponent implements OnChanges {
  @Input() galleryData: Photos[] = [];
  @Input() showCount = false;

  previewImage = false;
  showMask = false;
  currentLightboxImage: Photos = this.galleryData[0];
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;
  checked: boolean = false;

  getPhotoUrl(text: string) {
    return `http://localhost:3000/getPhoto/${text}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['galleryData']) {
      this.totalImageCount = this.galleryData.length;
    }
  }

  onPreviewImage(index: number) {
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.showMask = false;
    }
  }

  onClosePreview() {
    this.previewImage = false;
  }

  prev() {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.galleryData.length - 1;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  next() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.galleryData.length - 1) {
      this.currentIndex = 0;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }
}
