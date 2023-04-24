import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from './app.module';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DbSaveService {
  constructor(private http: HttpClient) {}

  saveCheckPoint() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'db/saveCheckPoint').subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  rollbackToCheckPoint() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'db/rollbackToCheckPoint').subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  commitChanges() {
    const promise = new Promise((resolve, reject) => {
      this.http.get(AppModule.apiLink + 'db/commitChanges').subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
    return promise;
  }
}
