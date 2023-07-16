import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PickupCallPage } from './pickup-call.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

describe('PickupCallPage', () => {
  let component: PickupCallPage;
  let fixture: ComponentFixture<PickupCallPage>;
  let navCtrl: NavController;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(PickupCallPage);
    navCtrl = TestBed.inject(NavController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create a pickup call', () => {
    spyOn(navCtrl, 'navigateBack');

    component.newPickupCall();

    expect(navCtrl.navigateBack).toHaveBeenCalledWith(['home']);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
