import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarComponent } from './cadastrar.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Alunos'
    },
    children: [
      {
        path: '',
        redirectTo: 'alunos'
      },
      {
        path: 'cadastrar',
        component: CadastrarComponent,
        data: {
          title: 'Cadastrar'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule {}
