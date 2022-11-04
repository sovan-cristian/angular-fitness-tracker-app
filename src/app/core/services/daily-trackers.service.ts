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

  getWeight() {
    const url = `${this.baseUrl}/weight`;
    return this.http.get(`${url}`);
  }

  updateWeight(data: any, id: number) {
    const endPoint = `/weight/${id}`;
    return this.http
      .patch(this.baseUrl + endPoint, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe((val) => {
        console.log('PATCH call successful value returned in body', val);
      });
  }

  getCalories() {
    const url = `${this.baseUrl}/calories`;
    return this.http.get(`${url}`);
  }

  updateCalories(data: any, id: number) {
    const endPoint = `/calories/${id}`;
    return this.http
      .patch(this.baseUrl + endPoint, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe((val) => {
        console.log('PATCH call successful value returned in body', val);
      });
  }

  getWaist() {
    const url = `${this.baseUrl}/waist`;
    return this.http.get(`${url}`);
  }

  updateWaist(data: any, id: number) {
    const endPoint = `/waist/${id}`;
    return this.http
      .patch(this.baseUrl + endPoint, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe((val) => {
        console.log('PATCH call successful value returned in body', val);
      });
  }
}
