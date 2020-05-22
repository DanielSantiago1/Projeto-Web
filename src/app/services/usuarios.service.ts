import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { url, httpOptions } from '../../environments/config.js';

@Injectable()
export class UsuariosService {

  constructor(private http: HttpClient) { }
 
  selecionarUsuarios() {
    return this.http.get(`${url}/selecionarUsuarios`, httpOptions);
  }

  criarUsuario(nome, email, perfil, senha) {
    let body = { nome, email, perfil, senha };
    return this.http.post(`${url}/criarUsuario`, body, httpOptions);
  }

  atualizarPerfilUsuarios(id_perfil, id_usuario) {
    let body = { id_perfil, id_usuario }
    return this.http.post(`${url}/atualizarPerfilUsuario`, body, httpOptions);
  }

}