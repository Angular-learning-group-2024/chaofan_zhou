import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { catchError, map } from 'rxjs';

const { baseURL } = environment;

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  get(api: string, options?: Record<string, any>) {
    return this.http
      .get(baseURL + api, {
        headers: new HttpHeaders({
          ...options,
        }),
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  }

  post(api: string, params: unknown, options?: Record<string, any>) {
    return this.http
      .post(baseURL + api, params, {
        headers: new HttpHeaders({
          ...options,
        }),
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  }
}
