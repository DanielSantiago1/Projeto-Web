import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { ListaComponent } from './lista.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuários'
    },
    children: [
      {
        path: '',
        redirectTo: 'criar'
      },
      {
        path: 'criar',
        component: UsuariosComponent,
        data: {
          title: 'Criar Conta'
        }
      },
      {
        path: 'lista',
        component: ListaComponent,
        data: {
          title: 'Lista de usuários'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule {}
