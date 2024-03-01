import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'swiper-component',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
})
export class SwiperComponent {
  @Input('speed') speed: number = 5000;
  @Input('autoPlay') autoPlay: boolean = true;
  @Input('imageList') imageList: string[] = [];

  currentIndex = 0;

  nextImg() {
    this.currentIndex += 1
  }

  prevImg() {
    this.currentIndex -= 1
  }
}
