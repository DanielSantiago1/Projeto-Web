import { ConsultarAvaliacoes, AgendarAvaliacoes } from './avaliacoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  constructor(private http: HttpClient) { }

  getConsultarAvaliacoes(){
    return this.http.get<ConsultarAvaliacoes[]>('assets/dados/consultar.json');
  }
  getAgendarAvaliacoes(){
    return this.http.get<AgendarAvaliacoes[]>('assets/dados/agendar.json');
  }
}
