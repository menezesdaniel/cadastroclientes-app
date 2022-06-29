import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/usuario';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrlBase + "/api/usuarios";
  tokenUrl: string = environment.apiUrlBase + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  getToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;    
  }

  sessionEnd(){
    localStorage.removeItem('access_token');
  }

  getAuthUser(){
    const token = this.getToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.getToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;      
    }
    return false;
  }

  salvar( usuario: Usuario ) : Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tryLogin( username: string, password: string ) : Observable<any> {
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    return this.http.post( this.tokenUrl, params.toString(), { headers });
  }
}
