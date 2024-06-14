import {afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {NgForOf, NgOptimizedImage} from "@angular/common";

import { SwiperOptions } from 'swiper/types';
import {register, SwiperContainer} from 'swiper/element/bundle';
register();

export interface lightboxImages {
  gallery: string[];
}

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    NgForOf,
    NgOptimizedImage,
    MatDialogClose
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {
  @ViewChild('swiperLightbox') swiperLightbox!: ElementRef<SwiperContainer>;
  @ViewChild('swiperLightboxThumbnails') swiperLightboxThumbnails!: ElementRef;

  public swiperLightboxParams!: SwiperOptions;
  public swiperLightboxThumbnailsParams!: SwiperOptions;

  constructor(@Inject(MAT_DIALOG_DATA) public data: lightboxImages) {
    console.log(this.data);

    afterNextRender((): void => {
      this.swiperLightboxParams = {
        slidesPerView: 1,
        navigation: true,
        loop: true,
        thumbs: {
          swiper: this.swiperLightboxThumbnails.nativeElement
        },
        injectStyles: [
          `.swiper-button-next, .swiper-button-prev {
              background-color: #ffffffd1;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 1.3rem;
              height: 1.3rem;
              padding: .6em;
              aspect-ratio: 1;
              border-radius: 100%;
          }`
        ]
      }
      Object.assign(this.swiperLightbox.nativeElement, this.swiperLightboxParams);
      this.swiperLightbox.nativeElement.initialize();

      this.swiperLightboxThumbnailsParams = {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        navigation: false,
        freeMode: true,
        watchSlidesProgress: true,
      }
      Object.assign(this.swiperLightboxThumbnails.nativeElement, this.swiperLightboxThumbnailsParams);
      this.swiperLightboxThumbnails.nativeElement.initialize();
    });
  }
}
