import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { url, httpOptions } from '../../environments/config.js';

@Injectable()
export class UsuariosService {

  constructor(private http: HttpClient) { }
 
  selecionarUsuarios() {
    return this.http.get(`${url}/selecionarUsuarios`, httpOptions);
  }

  atualizarPerfil(id_usuario, perfil) {
    let body = { id_usuario, perfil };
    return this.http.put(`${url}/atualizaPerfil`, body, httpOptions);
  }

  deletarUsuario(id_usuario) {
    let body = { id_usuario };
    return this.http.post(`${url}/deletarUsuario`, body, httpOptions);
  }

  buscarUsuario(nome){
    let body = { nome };
    return this.http.post(`${url}/buscarUsuario`, body, httpOptions);
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