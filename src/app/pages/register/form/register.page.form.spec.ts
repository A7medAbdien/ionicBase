import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('Register Page', () => {

  let registerPageForm: RegisterPageForm;
  let form: FormGroup;

  beforeEach(() => {

    registerPageForm = new RegisterPageForm(new FormBuilder());
    form = registerPageForm.getForm();

  })

  it('should empty name be invalid', () => {
    expect(form.controls['name'].valid).toBeFalse()
  })

  it('should password different form repeated password be invalid', () => {
    form.controls['password'].setValue('anyPassword')
    form.controls['repeatPassword'].setValue('anotherPassword')

    expect(form.controls['repeatPassword'].valid).toBeFalsy()
  })

  it('should form be valid', () => {

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

    expect(form.valid).toBeTruthy()
  })
})
