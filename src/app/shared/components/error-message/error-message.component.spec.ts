import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error massage component on touched and email invalid', () => {
    component.field = new FormGroup({ anyField: new FormControl() })

    component.field.markAsTouched();
    component.field.setErrors({ anyError: true })
    component.error = 'anyError'

    expect(component.shouldShowComponent()).toBeTruthy();
  });

  it('should hide error massage component if not touched', () => {
    component.field = new FormGroup({ anyField: new FormControl() })

    component.field.setErrors({ anyError: true })
    component.error = 'anyError'

    expect(component.shouldShowComponent()).toBeFalsy();
  });

  it('should hide error massage component on touched, but no error', () => {
    component.field = new FormGroup({ anyField: new FormControl() })

    component.field.markAsTouched();
    component.error = 'anyError'

    expect(component.shouldShowComponent()).toBeFalsy();
  });

  it('should hide error massage component on touched and has an error, but it is a different error', () => {
    component.field = new FormGroup({ anyField: new FormControl() })

    component.field.markAsTouched();
    component.field.setErrors({ anyError: true })
    component.error = 'anotherError'

    expect(component.shouldShowComponent()).toBeFalsy();
  });
});
