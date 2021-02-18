import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss']
})
export class GalleryPage implements OnInit {
  imageList = [];
  constructor() {}
  ngOnInit() {
    this.imageList = [
      'assets/images/gallery/1.jpg',
      'assets/images/gallery/2.jpg',
      'assets/images/gallery/3.jpg',
      'assets/images/gallery/4.jpg',
      'assets/images/gallery/5.jpg',
      'assets/images/gallery/6.jpg',
      'assets/images/gallery/7.jpg',
      'assets/images/gallery/8.jpg',
      'assets/images/gallery/9.jpg',
      'assets/images/gallery/10.jpg',
      'assets/images/gallery/11.jpg'
    ];
  }
}
