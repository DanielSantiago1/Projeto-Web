import { AvaliacoesService } from './avaliacoes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {animate, state, style, transition, trigger} from '@angular/animations';

import { ConsultarAvaliacoes } from './avaliacoes';

let ELEMENT_DATA: ConsultarAvaliacoes[];

@Component({
  selector: 'app-cadastrar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./avaliacoes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ConsultarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'data', 'total'];
  private dataSource: MatTableDataSource<any>;
  expandedElement: ConsultarAvaliacoes | null;
  
  //Form Groups
  agendar: FormGroup;
  
  //Timepicker
  hstep = 1;
  mstep = 15;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private FormBuilder: FormBuilder, private http: HttpClient,  private service: AvaliacoesService, private toastr: ToastrManager) { 
    this.agendar = this.FormBuilder.group ({
      nomeAluno: [null,[Validators.required]],
      dataAvaliacao: [null,[Validators.required]],
      horaAvaliacao: [null,[Validators.required]]
    });
  }

  getDataSource(){
    return this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  construirTabela(){
    this.service.getConsultarAvaliacoes().subscribe(dados => {
      ELEMENT_DATA = dados;
      this.dataSource = new MatTableDataSource<ConsultarAvaliacoes>(ELEMENT_DATA);
    });
    this.paginator._intl.itemsPerPageLabel= 'Itens por Página'
  }

  ngOnInit(){
    this.construirTabela();
  }

}
