import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pickup-call',
  templateUrl: './pickup-call.page.html',
  styleUrls: ['./pickup-call.page.scss'],
})
export class PickupCallPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  newPickupCall() {
    this.navCtrl.navigateBack(['home']);
  }
}
