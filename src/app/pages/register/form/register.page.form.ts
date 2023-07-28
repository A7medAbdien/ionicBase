import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class RegisterPageForm {

  private formBuilder: FormBuilder;
  private form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    let form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repeatPassword: ['', Validators.compose([])],
      phone: ['', Validators.compose([Validators.required])],
      address: this.formBuilder.group({
        street: ['', Validators.compose([Validators.required])],
        number: ['', Validators.compose([Validators.required])],
        neighborhood: ['', Validators.compose([Validators.required])],
        complement: ['', Validators.compose([Validators.required])],
        zipCode: ['', Validators.compose([Validators.required])],
        state: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
      })
    })

    form.controls['repeatPassword'].setValidators(matchPasswordAndRepeatPassword(form))

    return form
  }

  getForm(): FormGroup {
    return this.form
  }
}

function matchPasswordAndRepeatPassword(form: FormGroup): ValidatorFn {
  let validator = () => form.controls['password'].value == form.controls['repeatPassword'].value ? null : { 'isNotMatching': true }

  return validator
}
