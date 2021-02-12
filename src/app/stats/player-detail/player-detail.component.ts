import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  @Input() playerData;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  dismissModal() {
    this.modalController.dismiss();
  }

}
