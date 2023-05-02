import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrServices } from '../services/toastr.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  
  isLoggedIn : boolean = false;
  constructor(public authService: AuthService, private toastr: ToastrServices) {
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
