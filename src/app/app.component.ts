import { Component, OnInit } from '@angular/core';
import { ToastrServices } from './services/toastr.services';
import { HttpClient } from '@angular/common/http';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'iMS-frontend';

  constructor(private http: HttpClient, private toastr: ToastrServices) {}

  ngOnInit(): void {
    this.checkConnection();
  }

  getConnection() {
    const promise = new Promise((reject, resolve) => {
      this.http.get(AppModule.apiLink).subscribe(
        (data) => {
          if (data['success'] == true) {
          }
        },
        (error) => {
          this.toastr.error('Trying to reconnect...');
        }
      );
    });
    return promise;
  }

  checkConnection() {
    setInterval(() => {
      this.getConnection();
    }, 30000);
  }
}
