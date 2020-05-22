// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// //Outros modulos
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';

// // Agendar Component
import { AvaliacaoSimplesComponent } from './avaliacao-simples.component';
import { AgendarComponent } from './agendar.component';

// Collapse Module
import { CollapseModule } from 'ngx-bootstrap/collapse';

// // Tooltip Module
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// // Datepicker Module
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// // Timepicker
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// // Component Routing
import { AvaliacoesRoutingModule } from './avaliacoes-routing.module';

import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';

import { MatPaginatorModule } from '@angular/material/paginator';

import { ConsultarComponent } from './consultar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AvaliacoesRoutingModule,
    TextMaskModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    TimepickerModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
  AvaliacaoSimplesComponent,
  AgendarComponent,
  ConsultarComponent]
})
export class AvaliacoesModule { }
