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
}
