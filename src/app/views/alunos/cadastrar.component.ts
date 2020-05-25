// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// Adicionais
import { ToastrManager } from 'ng6-toastr-notifications';
// Projeto
import { EstadoBr, CidadeBr } from './estado-cidade-br';
import { AlunosService } from '../../services/alunos.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./alunos.component.css'],
  providers: [AlunosService]
})
export class CadastrarComponent implements OnInit {

  private inputCPF: string;

  private alunoForm: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private toastr: ToastrManager,
    private alunosService: AlunosService
  ) {

    this.alunoForm = this.FormBuilder.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      dataNascimento: [null, [Validators.required]],
      sexo: [null, [Validators.required]],
      endereco: this.FormBuilder.group({
        cep: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        complemento: [null],
      }),
      telefone: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      celular: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      responsavel: [null],
      faixaEtaria: [null],
      etnia: [null],
      descricao: [null, [Validators.maxLength(500)]]
    });
  }

  get AlunoForm() {
    return this.alunoForm;
  }

  get AlunoFormValue() {
    return this.alunoForm.value;
  }

  get InputCPF() {
    return this.inputCPF;
  }

  VerificaCPF() {
    let cpf = this.alunoForm.get('cpf').value;

    if (cpf == null) {
      this.toastr.infoToastr("CPF inválido", "Atenção")
      this.inputCPF = "is-invalid";
      return false;
    }
    if (cpf.length != 11) {
      this.toastr.infoToastr("CPF inválido", "Atenção")
      this.inputCPF = "is-invalid";
      return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      this.toastr.infoToastr("CPF inválido", "Atenção")
      this.inputCPF = "is-invalid";
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        this.toastr.infoToastr("CPF inválido", "Atenção")
        this.inputCPF = "is-invalid";
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      this.toastr.infoToastr("CPF inválido", "Atenção");
      this.inputCPF = "is-invalid";
      return false;
    }
    else {
      this.inputCPF = "is-valid";
      return true;
    }
  }

  consultaCEP() {
    let cep = this.alunoForm.get('endereco.cep').value;
    //Verifica se campo cep possui valor informado.
    if (cep != "" && cep != null) {
      this.alunosService.consultaCEP(cep).subscribe(resp => {
        if (!("erro" in resp)) {
          this.populaFormulario(resp);
        } else {
          this.populaFormulario('invalido');
          this.toastr.warningToastr('CEP inválido', 'Atenção');
        }
      });
    }
  }

  populaFormulario(dados) {
    if (dados === 'invalido') {
      this.alunoForm.patchValue({
        endereco: {
          rua: null,
          bairro: null,
          cidade: null,
          estado: null,
        }
      });
    } else {
      this.alunoForm.patchValue({
        endereco: {
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf,
        }
      });
    }
  }

  criarAluno() {
    let aluno = this.AlunoFormValue;
    console.log(aluno);
    // nome, cpf, email, dataNascimento, sexo, telefone, celular, responsavel, faixaEtaria, etnia, descricao, cep, rua, bairro, estado, cidade, complemento
    if (this.alunoForm.valid && this.inputCPF === 'is-valid') {
      this.alunosService.criarAluno(aluno.nome, aluno.cpf, aluno.email, aluno.dataNascimento, aluno.sexo, aluno.telefone, aluno.celular,
        aluno.responsavel, aluno.faixaEtaria, aluno.etnia, aluno.descricao, aluno.endereco.cep, aluno.endereco.rua, aluno.endereco.bairro,
        aluno.endereco.estado, aluno.endereco.cidade, aluno.endereco.complemento).subscribe(resp => {
          console.log(resp);
          if (resp[0] === 200 && resp[1] === 1) {
            this.toastr.successToastr('Cadastro do aluno foi realizado', 'SUCESSO');
            this.alunoForm.reset();
            this.inputCPF = '';
          }
        })
    } else {
      this.toastr.warningToastr('Os campos em vermelho necessitam estar preenchidos.', 'Atenção')
      this.verificaValidação(this.alunoForm);
    }
  }

  verificaValidação(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidação(controle);
      }
    });
  }

  verificaCampo(campo) {
    let atributo = this.alunoForm.get(campo);

    if (atributo.valid && (atributo.touched || atributo.dirty)) {
      return "is-valid"
    }
    else if (atributo.invalid && (atributo.touched || atributo.dirty)) {
      return "is-invalid"
    }
  }

  ngOnInit() {
  }

}
