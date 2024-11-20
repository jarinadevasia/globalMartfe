import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // using reactive forms
  constructor(private fb: FormBuilder, private apiService: ApiService, private router:Router) { }
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  registerUser() {
    // alert('hii')
    if (this.registerForm.valid) {
      // alert('valid')
      const username = this.registerForm.value.username;
      // alert(username)
      const password = this.registerForm.value.password;
      const email = this.registerForm.value.email;
      const user = {
        username: username,
        email: email,
        password: password
      }
      // call the api method to register user
      this.apiService.userRegisterApi(user).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Success',
            text: `${res}`,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigateByUrl('/user/login')
        },
        error: (err) => {
          if (err.status === 406) {
            Swal.fire({
              title: 'Error!',
              text: 'Do you want to continue',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        }
      })
    }
    else {
      // alert('not valid')
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Go back'
      })
    }
  }
}
