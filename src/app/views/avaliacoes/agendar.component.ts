import { AvaliacoesService } from './avaliacoes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AgendarAvaliacoes } from './avaliacoes';

let ELEMENT_DATA: AgendarAvaliacoes[];

@Component({
  selector: 'app-cadastrar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./avaliacoes.component.css']
})
export class AgendarComponent implements OnInit {

  private displayedColumns: string[] = ['id', 'nome', 'data', 'hora'];
  private dataSource: MatTableDataSource<any>;

  //Form Groups
  private agendar: FormGroup;

  //Timepicker
  private hstep = 1;
  private mstep = 15;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private FormBuilder: FormBuilder, private http: HttpClient, private service: AvaliacoesService, private toastr: ToastrManager) { 
    this.agendar = this.FormBuilder.group ({
      nomeAluno: [null,[Validators.required]],
      dataAvaliacao: [null,[Validators.required]],
      horaAvaliacao: [null,[Validators.required]]
    });
  }

  getDisplayedColumns(){
    return this.displayedColumns;
  }

  getDataSource(){
    return this.dataSource;
  }

  getAgendar(){
    return this.agendar;
  }

  getHstep(){
    return this.hstep;
  }

  getMstep(){
    return this.mstep;
  }

  formataData(){
      this.agendar.patchValue({
        dataAvaliacao: this.agendar.get('dataAvaliacao').value.toLocaleDateString('pt-BR'),
        horaAvaliacao: this.agendar.get('horaAvaliacao').value.toLocaleTimeString('pt-BR')
      });
  }

  enviaFormulario(){
    if (this.agendar.valid){
      this.formataData();
      this.toastr.successToastr(`${this.agendar.get('nomeAluno').value} foi agendado`,'Sucesso');
    } else {
      this.toastr.warningToastr('Os campos em vermelho necessitam estar preenchidos.','Atenção')
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
    let atributo = this.agendar.get(campo);
    if (atributo.valid && (atributo.touched || atributo.dirty)){ return "is-valid" }
    if (atributo.invalid && (atributo.touched || atributo.dirty)) { return "is-invalid" }
  }

  construirTabela(){
    this.service.getAgendarAvaliacoes().subscribe(dados => {
      ELEMENT_DATA = dados;
      this.dataSource = new MatTableDataSource<AgendarAvaliacoes>(ELEMENT_DATA);
    });
    this.paginator._intl.itemsPerPageLabel= 'Itens por Página'
  }

  ngOnInit(){
    this.construirTabela();
  }

}
