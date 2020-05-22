// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// //Outros modulos
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';

// // Cadastrar Component
import { CadastrarComponent } from './cadastrar.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// // Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// // Component Routing
import { AlunosRoutingModule } from './alunos-routing.module';

// // BsDatePickerModule
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxMaskModule, IConfig } from 'ngx-mask'
 
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlunosRoutingModule,
    TextMaskModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    CadastrarComponent
  ]
})
export class AlunosModule { }
