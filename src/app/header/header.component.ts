import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  
  isLoggedIn : boolean = false;
  constructor(public authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit() {
      this.isLoggedIn = this.authService.getSession();
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.toastr.success("Logged out!");
  }
}
