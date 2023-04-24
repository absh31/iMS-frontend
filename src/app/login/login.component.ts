import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  pageReady: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm()
      .then(() => {
        this.pageReady = true;
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
      });
  }

  initForm() {
    const promise = new Promise((resolve, reject) => {
      let username = '';
      let password = '';
      this.loginForm = new FormGroup({
        username: new FormControl(username),
        password: new FormControl(password),
      });
    });
    return promise;
  }

  onSubmit() {
    this.getLoginForm()
      .then((data) => this.authService.login(data))
      .then((data) => this.authService.saveLoginDetails(data))
      .then((data) => {
        //navigate
        this.router.navigate(['/dashboard'], { relativeTo: this.route });
        //toastr
        this.toastr.success('Login Succesful! Welcome, back.');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error.error['message']);
      });
  }

  getLoginForm() {
    const promise = new Promise((resolve, reject) => {
      let username = this.loginForm.value['username'];
      let password = this.loginForm.value['password'];
      let data = {
        username: username,
        password: password,
      };
      resolve(data);
    });
    return promise;
  }

  
}
