import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { url, httpOptions } from '../../../environments/config.js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient) {}

  authenticate(email: string, senha: string){
    let body = { email, senha }; 
    return this.http.post(`${url}/selecionarUsuario`, body, httpOptions);
  }
}
