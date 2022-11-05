import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private readonly baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getChandSh() {
    const url = `${this.baseUrl}/ChestAndShoulder`;
    return this.http.get(`${url}`);
  }

  getBiandTri() {
    const url = `${this.baseUrl}/BicepsAndTriceps`;
    return this.http.get(`${url}`);
  }

  addBiandTri(data: any) {
    this.http
      .post(`${this.baseUrl}/BicepsAndTriceps`, data, {
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

  deleteBiandTri(id: any) {
    return this.http
      .delete(`${this.baseUrl}/BicepsAndTriceps/${id}`)
      .subscribe((val) => {
        console.log('PATCH call successful value returned in body', val);
      });
  }

  updateBiandTri(id: any, data: any) {
    this.http
      .patch(`${this.baseUrl}/BicepsAndTriceps/${id}`, data, {
        headers: { ['Content-Type']: 'application/json' },
      })
      .subscribe((val) => {
        console.log('PATCH call successful value returned in body', val);
      });
  }
}
