import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth,AuthResponse } from './../model/auth';
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private cargando: boolean = false;
  private usuarioCargado: boolean = false;
  private URL_AUTH = 'https://dummyjson.com/auth/login';
  private datosUsuario!: AuthResponse | null | Observable<null>;
  private token: string | undefined = '';

  constructor(private http: HttpClient,
    private alert: AlertController,
    private router: Router) { }

  public autenticar({ username, password }: Auth) {
    this.cargando = true;
    this.http.post<AuthResponse>(this.URL_AUTH, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(async (error: HttpErrorResponse) => {
        this.cargando = false;
        if (error.status === 400) {
          const alerta = await this.alert.create({
            header: 'Usuario y contraseña incorrecta',
            buttons: [{
              text: 'OK',
              role: 'confirm',
            }]
          });
          await alerta.present();
        };
        return null;
      })
    )
      .subscribe(async (datos) => {
        this.datosUsuario = datos;
        this.token = this.datosUsuario?.token;
        this.cargando = false;
        if (datos) {
          const alerta = await this.alert.create({
            header: 'Correcto',
            buttons: [{
              text: 'OK!',
              role: 'confirm',
            }]
          });
          await alerta.present();
          this.usuarioCargado = true;
          this.router.navigate(['/perfil'], {
            queryParams: {
              username: this.datosUsuario?.username,
              email: this.datosUsuario?.email,
              firstName: this.datosUsuario?.firstName,
              lastName: this.datosUsuario?.lastName,
              gender: this.datosUsuario?.gender,
              image: this.datosUsuario?.image
            }
          })
        }
      });

  }

  public obtenerDatosUsuario() {
    return this.datosUsuario;
  }

  public obtenerCargando() {
    return this.cargando;
  }

  public obtenerEstadoUsuario() {
    return this.usuarioCargado;
  }

  public obtenerToken() {
    return this.token;
  }

}
