import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.login();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  login() {
    this.router.navigate(['home']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
