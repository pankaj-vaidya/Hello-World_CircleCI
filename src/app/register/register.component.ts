import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  registerUserData:any ={}

  constructor(private _auth: AuthService, private _router: Router
) {}


  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/special'])
    },
  (err: any) => console.log(err))
  }
}
