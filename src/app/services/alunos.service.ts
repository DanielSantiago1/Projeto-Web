import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { url, httpOptions } from '../../environments/config.js';
import { of } from 'rxjs';

@Injectable()
export class AlunosService {

  constructor(private http: HttpClient) { }
 
  consultaCEP(cep: string){
    //Verifica se campo cep possui valor informado.
    if (cep != "" && cep != null){
      cep = cep.replace('-', '');
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }
    return of ({'erro': true});
  }

  selecionarUsuarios() {
    return this.http.get(`${url}/selecionarAlunos`, httpOptions);
  }

  criarAluno(nome, cpf, email, dataNascimento, sexo, telefone, celular, responsavel, faixaEtaria, etnia, descricao, cep, rua, bairro, estado, cidade, complemento) {
    let body = { nome, cpf, email, dataNascimento, sexo, telefone, celular, responsavel, faixaEtaria, etnia, descricao, cep, rua, bairro, estado, cidade, complemento };
    return this.http.post(`${url}/criarAluno`, body, httpOptions);
  }

}