import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private fg: FormBuilder, 
              private globalService : GlobalService,
              private router: Router
            ) 
            {}

  ngOnInit(): void {
    this.loginForm = this.fg.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.loginForm.patchValue({
      userName: this.userName?.value.trim(),
      password: this.password?.value.trim()
    });

    if (!this.loginForm.valid) {
      this.userName?.markAllAsTouched();
      this.password?.markAllAsTouched();
    }
    else {

      const payload = { 
        userName: this.userName?.value
      }

      this.globalService.login(payload).subscribe((response) => {
            localStorage.setItem('android', JSON.stringify({token: response.token}));
            this.router.navigate([''])
      })
    }
  }

  clear() {
    this.loginForm.patchValue({ userName: null, password: null })
  }

  get userName(){
    return this.loginForm.get('userName')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
