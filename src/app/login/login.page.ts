import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router'
import { AuthApiService } from './../servicios/auth-api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario! : FormGroup
  constructor(
    public prueba: AuthApiService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: ['kminchelle'],
      password: ['0lelplR'],
    })
  }
  public submitForm() {
    this.prueba.autenticar({
      username: this.formulario.value['username'],
      password: this.formulario.value['password']
    })
  }

}
