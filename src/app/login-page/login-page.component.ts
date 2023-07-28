import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiContactService } from '../services/api/api-contact.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router) {
  }
  datasave(){
    const veri: any = {id: 'rOrMp9vaOIvTzk8u18ET', name: "admin",password: "12345678"};
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    if (username.value === veri.name && password.value === veri.password) {
      this.router.navigate(['/products']);
      localStorage.setItem('id', veri.id );
  }
  else{
    alert('Kullanıcı adı veya şifre yanlış');
  }
}
}
