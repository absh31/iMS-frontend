import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AES, enc } from 'crypto-ts';
import { AppModule } from '../app.module';
import { ToastrServices } from './toastr.services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrServices,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  sessionDetailsJSON: any = {};
  isUserLoggedIn: boolean = true;

  login(data) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(AppModule.apiLink + 'auth', data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => reject(error)
      );
    });
    return promise;
  }

  saveLoginDetails(data) {
    const promise = new Promise((resolve, reject) => {
      this.sessionDetailsJSON = data;
      let details = JSON.stringify(data);
      let encDetails = AES.encrypt(details, 'absh').toString();
      sessionStorage.setItem('loginDetails', encDetails);
      this.isUserLoggedIn = true;
      resolve(data);
    });
    return promise;
  }

  logout(): void {
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('loginDetails');
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  public getSession(): boolean {
    // const sessionDetails = sessionStorage.getItem('loginDetails');
    // const sessionDetailsJSON = JSON.parse(sessionDetails);
    if (sessionStorage.getItem('loginDetails')) {
      const sessionDetails = AES.decrypt(
        sessionStorage.getItem('loginDetails'),
        'absh'
      ).toString(enc.Utf8);
      const sessionDetailsJSON = JSON.parse(sessionDetails);
      if (sessionDetailsJSON !== null) {
        const sessionIP = sessionDetailsJSON['IP'];
        const sessionTime = +sessionDetailsJSON['timestamp'];
        const sessionUserName = sessionDetailsJSON['userName'];
        const sessionUserId = sessionDetailsJSON['userId'];
        let currentTime: number = Date.now();
        if (sessionTime > currentTime) {
          this.isUserLoggedIn = true;
          return true;
        } else {
          this.logout();
          this.toastr.warning('Login Required');
          return false;
        }
      } else {
        this.toastr.warning('Login Required');
        return false;
      }
    } else {
      this.toastr.warning('Login Required');
      return false;
    }
  }
}
