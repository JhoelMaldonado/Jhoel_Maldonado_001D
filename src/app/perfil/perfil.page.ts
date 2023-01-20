import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthApiService } from './../servicios/auth-api.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{

  public username: string = '';
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public gender: string = '';
  public image: string = '';
  public token: string | undefined = '';


  constructor(
    private route: ActivatedRoute,
    private auth: AuthApiService,
  ) { }


  ionViewWillEnter() {
    this.route.queryParams.subscribe(parametros => {
      this.username = parametros['username'] || '';
      this.email = parametros['email'] || '';
      this.firstName = parametros['firstName'] || '';
      this.lastName = parametros['lastName'] || '';
      this.gender = parametros['gender'] || '';
      this.image = parametros['image'] || '';

      this.token = this.auth.obtenerToken()

    })
  }




}
