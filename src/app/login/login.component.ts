import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private fb: FormBuilder, private apiService:ApiService, private route:Router){}
loginForm = this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
login(){
  // alert('hiii')
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  console.log(email,password);
  const user = {
    email:email,
    password:password
  }
  this.apiService.userLoginApi(user).subscribe({
    next:(res:any)=>{
      // console.log('user login',res);
      sessionStorage.setItem('username',res.existingUser.username);
      sessionStorage.setItem('token',res.token);
      Swal.fire({
        title: 'Login Successfull',
        text: `${res.existingUser.username} Logged Successfully`,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
this.route.navigateByUrl('/')
    },
    error:(res)=>{
      console.log(res);
      Swal.fire({
        title: 'Error!',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonText: 'Try Again'
      })
    }
  })
}
}
