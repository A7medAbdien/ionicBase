import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  @Input() errorMessage: string;
  @Input() field: any;
  @Input() error: string;

  constructor() { }

  ngOnInit() { }

  shouldShowComponent() {

    // form.controls['email'].hasError('required') && form.controls['email'].touched
    if (this.field?.touched && this.field?.hasError(this.error)) {
      return true;
    }
    return false;
  }


}
