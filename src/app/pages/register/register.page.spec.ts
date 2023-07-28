import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: any;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create register form on init', () => {
    expect(component.registerForm.getForm()).not.toBeUndefined();
  });

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');

    const form = component.registerForm.getForm();

    form.controls['name'].setValue('anyName')
    form.controls['email'].setValue('any@email.com')
    form.controls['password'].setValue('anyPassword')
    form.controls['repeatPassword'].setValue('anyPassword')
    form.controls['phone'].setValue('anyPhone')
    form.controls['address'].get('street')?.setValue('anyStreet')
    form.controls['address'].get('number')?.setValue('anyNumber')
    form.controls['address'].get('neighborhood')?.setValue('anyNeighborhood')
    form.controls['address'].get('complement')?.setValue('anyComplement')
    form.controls['address'].get('zipCode')?.setValue('anyZipCode')
    form.controls['address'].get('state')?.setValue('anyState')
    form.controls['address'].get('city')?.setValue('anyCity')

    page.querySelector('#registerButton').click();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow register with form invalid', () => {

    spyOn(router, 'navigate');

    page.querySelector('#registerButton').click();

    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
});
