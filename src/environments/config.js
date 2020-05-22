import { HttpHeaders } from '@angular/common/http';

export const url = 'http://localhost:8081';
export const token = '123';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',  // Enviar como json
        'Accept': 'application/json',  // Aceitar receber como json
        'x-access-token': token
    })
}
