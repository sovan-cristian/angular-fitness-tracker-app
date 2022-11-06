import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DailyTrackersService {
  private readonly baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getData(id: any) {
    const url = `${this.baseUrl}/users?firebaseID=${id}`;
    return this.http.get(`${url}`);
  }

  updateData(data: any, id: number) {
    const endPoint = `/users/${id}`;
    return this.http
      .patch(this.baseUrl + endPoint, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe((val) => {
        console.log('PATCH call successful value returned in body', val);
      });
  }

  createUser(data: any) {
    const url = `${this.baseUrl}/users`;
    this.http
      .post(url, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe(
        (val) => {
          console.log('PATCH call successful value returned in body', val);
        },
        (response) => {
          console.log('PATCH call in error', response);
        },
        () => {
          console.log('The PATCH observable is now completed.');
        }
      );
  }
}
