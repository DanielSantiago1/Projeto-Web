import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoSimplesComponent } from './avaliacao-simples.component';
import { AgendarComponent } from './agendar.component';
import { ConsultarComponent } from './consultar.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Avaliações'
    },
    children: [
      {
        path: '',
        redirectTo: 'avaliacoes'
      },
      {
        path: 'agendar',
        component: AgendarComponent,
        data: {
          title: 'Agendar'
        }
      },
      {
        path: 'consultar',
        component: ConsultarComponent,
        data: {
          title: 'Consultar'
        }
      },
      {
        path: 'tipo/simples',
        component: AvaliacaoSimplesComponent,
        data: {
          title: 'Simples'
        } 
      },
      {
        path: 'tipo/avancada',
        component: AvaliacaoSimplesComponent,
        data: {
          title: 'Avançada'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacoesRoutingModule {}
