import { LoginComponent } from './login.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AuthService } from '../core/auth.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/vmessage/vmessage.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        VMessageModule,
        HttpClientModule,
        ToastrModule.forRoot()
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        AuthService
    ]
})

export class HomeModule { }