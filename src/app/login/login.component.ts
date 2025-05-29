import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUserData:any = {}
  constructor(private readonly _auth: AuthService, private readonly _router: Router){}


  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/special'])
    },
  (err: any) => console.log(err))
  }
}
