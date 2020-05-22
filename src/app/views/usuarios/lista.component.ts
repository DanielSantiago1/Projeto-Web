import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { UsuariosLista } from './usuarios';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './lista.component.html',
  styleUrls: ['./usuarios.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ListaComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'perfil','opcao'];
  private dataSourceUsuarios: MatTableDataSource<UsuariosLista>;
  expandedElement: any | null;

  private pesquisaForm: FormGroup;
  private listaUsuarios;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private FormBuilder: FormBuilder, 
    private http: HttpClient, 
    private toastr: ToastrManager,
    private usuariosService: UsuariosService
  ) { 
    this.pesquisaForm = this.FormBuilder.group({
      id_usuario: [null],
      nome: [null, [Validators.required, Validators.minLength(1)]],
      email: [null],
      perfil: [null],
    })
  }

  get PesquisaForm(){
    return this.pesquisaForm;
  }

  get DataSourceUsuarios(){
    return this.dataSourceUsuarios;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuarios.filter = filterValue.trim().toLowerCase();
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

  atualizarPerfil(id_usuario, perfil){
    let perfilNovo = perfil == 'ADMINISTRADOR'? 'AVALIADOR' : 'ADMINISTRADOR';
    this.usuariosService.atualizarPerfil(id_usuario, perfilNovo).subscribe(resp => {
      if (resp[0] == 200){
        this.toastr.infoToastr('Atualizado com sucesso');
        this.construirTabela();
      } else {
        this.toastr.errorToastr('Problema na conexão com o servidor');
      }
    })
  }

  deletarUsuario(id_usuario){
    this.usuariosService.deletarUsuario(id_usuario).subscribe(resp => {
      if(resp[0] == 200){
        this.toastr.successToastr('Deletado com sucesso');
        this.construirTabela();
      }
    })
  }

  buscarUsuario(){
    let nome = this.pesquisaForm.get('nome').value;

    this.usuariosService.buscarUsuario(nome).subscribe(resp => {
      if (resp[0] == 200){
        this.toastr.successToastr(`Resultados sobre '${nome}' encontrados estão listados`,'Sucesso');
        this.listaUsuarios = resp[1];
        this.dataSourceUsuarios = new MatTableDataSource<UsuariosLista>(this.listaUsuarios);
      } else {
        this.toastr.errorToastr('Erro na conexão com o servidor','Erro');
      }
    })
  }

  construirTabela(){
    this.usuariosService.selecionarUsuarios().subscribe(dados => {
      this.listaUsuarios = dados[1];
      this.dataSourceUsuarios = new MatTableDataSource<UsuariosLista>(this.listaUsuarios);
    });
    this.paginator._intl.itemsPerPageLabel= 'Itens por Página'
  }

  ngOnInit(){
    this.construirTabela();
  }

}
