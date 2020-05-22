import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-contaForm',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {

  private contaForm: FormGroup;

  private compararSenhas: boolean;
  private inputConfirmaSenha: string;

  constructor(
    private FormBuilder: FormBuilder, 
    private toastr: ToastrManager,
    private usuariosService: UsuariosService
  ) { 
    this.contaForm = this.FormBuilder.group ({
      nome: [null, [Validators.required]],
      email: [null,[Validators.required,Validators.email]],
      perfil: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(5)]],
      confirmaSenha: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  get ContaForm(){
    return this.contaForm;
  }

  get ContaFormValue(){
    return this.contaForm.value;
  }

  get CompararSenhas() {
    return this.compararSenhas;
  }

  get InputConfirmaSenha(){
    return this.inputConfirmaSenha;
  }

  is_CompararSenhas(resultado: boolean) {
    this.compararSenhas = resultado;
  }

  criarUsuario(){
    let conta = this.ContaFormValue;

    if (this.contaForm.valid && this.compararSenhas){
      this.usuariosService.criarUsuario(conta.nome, conta.email, conta.perfil, conta.senha).subscribe(resp =>{
        if (resp[0] === 200 && resp[1]){
          this.toastr.successToastr('Novo usuário foi cadastrado no sistema','SUCESSO');
          this.contaForm.reset();          
        }
      })
    } else {
      this.toastr.warningToastr('Os campos em vermelho necessitam estar preenchidos.','ATENÇÃO');
      this.verificarValidacao(this.contaForm);
    }
  }

  resetarFormulario(){
    this.contaForm.reset();
  }

  verificarValidacao(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificarValidacao(controle);
      }
    });
    if (this.inputConfirmaSenha == undefined) {
      this.inputConfirmaSenha = 'is-invalid';
    }
  }

  validacaoCSS(campo: string){
    let atributo = this.contaForm.get(campo);
    if (campo == 'confirmaSenha' && (atributo.value != '' || atributo.value != null)) {
      if (atributo.valid && atributo.value == this.contaForm.get('senha').value && (atributo.touched || atributo.dirty)) {
        this.is_CompararSenhas(true);
        this.inputConfirmaSenha = "is-valid";
      }
      else if (atributo.touched || atributo.dirty) {
        this.is_CompararSenhas(false);
        this.inputConfirmaSenha = "is-invalid";
      }
    }
    else if (atributo.valid && (atributo.touched || atributo.dirty)) { return "is-valid" }
    else if (atributo.invalid && (atributo.touched || atributo.dirty)) { return "is-invalid" }
  }

  ngOnInit() {

  }

}
