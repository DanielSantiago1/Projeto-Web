import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = "../../../assets/img/logo-img/logo-ade.fw.png";

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrManager,
    private router: Router
  ) { }

  get LoginFormValue(){
    return this.loginForm.value;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    let conta = this.LoginFormValue;

    this.authService.authenticate(conta.userName, conta.password)
      .subscribe(resp => {
        if(resp[0] == 200){
          if (resp[1] == '' || resp[1] == null){
            this.toastr.infoToastr('Email ou Senha invalido');
          } else {
            this.toastr.successToastr('Login efetuado com sucesso');
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.toastr.errorToastr('Erro na conexão')
        }
      });
  }
}
