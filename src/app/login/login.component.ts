import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  constructor(private _auth: AuthService, private _router: Router){}


  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/special'])
     // this.toastr.error('Hello world!', 'Toastr fun!');
    },
  (err: any) => console.log(err))
  }
}
