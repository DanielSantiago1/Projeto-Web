import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class Masks {
    
    dataMask = [/[0-9]/, /\d/,'/' ,/\d/ ,/\d/,'/' ,/\d/, /\d/, /\d/, /\d/];
    phoneMask = ['(',/[0-9]/, /\d/, ')',' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    celPhoneMask = ['(',/[0-9]/, /\d/, ')',' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    cepMask = [/[0-9]/, /\d/,/\d/ ,/\d/ ,/\d/, '-', /\d/, /\d/, /\d/];
    rgMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
    cpfMask = [/[0-9]/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

}