import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-call-card',
  templateUrl: './pickup-call-card.component.html',
  styleUrls: ['./pickup-call-card.component.scss'],
})
export class PickupCallCardComponent implements OnInit {

  @Input() hasHeader: boolean;
  @Input() hasFooter: boolean;
  @Input() status: string;
  @Input() updatedAt: string;
  @Input() createdAt: string;
  @Input() notes: string;
  @Input() amount: string | number;

  statusArray: { [key: string]: string } = {
    'hold': 'On hold',
    'processing': 'Processing',
    'finished': 'Finished',
  };

  statusIcon: { [key: string]: string } = {
    'hold': 'hourglass-outline',
    'processing': 'archive-outline',
    'finished': 'checkmark-circle-outline',
  };

  statusColor: { [key: string]: string } = {
    'hold': 'warning',
    'processing': 'primary',
    'finished': 'success',
  };

  constructor() { }

  ngOnInit() {
  }

}
