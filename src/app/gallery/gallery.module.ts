import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryPage } from './gallery.page';

import { GalleryPageRoutingModule } from './gallery-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: GalleryPage }]),
    GalleryPageRoutingModule,
  ],
  declarations: [GalleryPage]
})
export class GalleryPageModule {}
