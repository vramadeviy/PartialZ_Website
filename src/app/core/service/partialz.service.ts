import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PartialzService {
  visible: boolean = false;

  constructor(private http: HttpClient) { }

  get<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { headers, params });
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers });
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers });
  }
  hide() { this.visible = true; };

  show() { this.visible = false;   };

  public getItems() {
    const url = 'https://localhost:7178/api/Employee?EmailID=rakhi.rakesh237@gamil.com';

    // Send GET request
    this.http.get(url).subscribe(
      (response) => {
        // Handle the response data
        console.log(response);
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }
  // POST request example
  public RegsregisterEmployee(emailID: string, Password: string) {
    const url = 'https://localhost:7178/api/Employee';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      Email: emailID,
      Password: Password
    };
    // Send POST request
    this.http.post(url, body, { headers }).subscribe(
      (response) => {
        // Handle the response data
        console.log(response);
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }
}
