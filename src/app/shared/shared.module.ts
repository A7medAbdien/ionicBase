import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PickupCallCardComponent } from './components/pickup-call-card/pickup-call-card.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
// import { CapitalizePipe } from './pipes/capitalize.pipe';


const components = [
  PickupCallCardComponent,
  ErrorMessageComponent,
];

@NgModule({
  declarations: [
    ...components,
    // CapitalizePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ...components,
  ]
})
export class SharedModule { }
