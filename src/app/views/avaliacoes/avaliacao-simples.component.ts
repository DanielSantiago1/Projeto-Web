import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './avaliacao-simples.component.html',
  styleUrls: ['./avaliacoes.component.css']
})
export class AvaliacaoSimplesComponent implements OnInit {

  // //Mascaras de texto
  dataMask = [/[0-9]/, /\d/,'/' ,/\d/ ,/\d/,'/' ,/\d/, /\d/, /\d/, /\d/];
  phoneMask = ['(',/[0-9]/, /\d/, ')',' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  celPhoneMask = ['(',/[0-9]/, /\d/, ')',' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepMask = [/[0-9]/, /\d/,/\d/ ,/\d/ ,/\d/, '-', /\d/, /\d/, /\d/];
  rgMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
  cpfMask = [/[0-9]/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  //Form Groups
  avaliacaoSimples: FormGroup;

  //Chaveador
  inputText: false;

  constructor(private FormBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrManager) { 
    this.avaliacaoSimples = this.FormBuilder.group ({
      nomeAluno: [null, [Validators.required]],
      dataAtual: [null, [Validators.required]],
      avaliador: [null,[Validators.required]],
      torax: [null,[Validators.required]],
      cintura: [null, [Validators.required]],
      abdome: [null, [Validators.required]],
      quadril: [null, [Validators.required]],
      toraxDireto: [null, [Validators.required]],
      toraxEsquerdo: [null, [Validators.required]],
      CinturaDireita: [null,[Validators.required]],
      CinturaEsquerda: [null,[Validators.required]],
      abdomeDireito: [null,[Validators.required]],
      abdomeEsquerdo: [null,[Validators.required]],
      quadrilDireito: [null, [Validators.required]],
      quadrilEsquerdo: [null,[Validators.required]],
      antebracoDireito: [null, [Validators.required]],
      antebracoEsquerdo: [null, [Validators.required]],
      bracoDireito: [null,[Validators.required]],
      bracoEsquerdo: [null, [Validators.required]],
      coxaDireita: [null, [Validators.required]],
      coxaEsquerda: [null, [Validators.required]],
      pantirilhaDireita: [null, [Validators.required]],
      pantirilhaEsquerda: [null, [Validators.required]],
      padraoAnatomico: [null,[Validators.required]]
    });
  }

  radioButton(valor){
    this.inputText = valor;
    if (valor == true){
      this.avaliacaoSimples.patchValue({
        padraoAnatomico: null
      })
    }
  }

  enviaFormulario(){
    if (this.avaliacaoSimples.valid){
      this.toastr.successToastr(`${this.avaliacaoSimples.get('nome').value} foi cadastrado`,'Sucesso');
      this.avaliacaoSimples.reset();
    } else {
      this.toastr.warningToastr('Os campos em vermelho necessitam estar preenchidos.','Atenção')
      this.verificaValidação(this.avaliacaoSimples);
    }
  }

  verificaValidação(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup){
        this.verificaValidação(controle);
      }
    });
  }

  validacaoCSS(campo: string){
    let atributo = this.avaliacaoSimples.get(campo);
    if (atributo.valid && (atributo.touched || atributo.dirty)){ return "is-valid" }
    if (atributo.invalid && (atributo.touched || atributo.dirty)) { return "is-invalid" }
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  ngOnInit(): void {
  }

}
