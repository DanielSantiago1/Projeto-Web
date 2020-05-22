// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// //Outros modulos
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';

// // Cadastrar Component
import { UsuariosComponent } from './usuarios.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// // Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// // Component Routing
import { PerfilRoutingModule } from './usuarios-routing.module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PerfilRoutingModule,
    TextMaskModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
