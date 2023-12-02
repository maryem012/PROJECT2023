import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { request } from '../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRequests(): Observable<any[]>{
    return this.http.get<request[]>(`${this.BASE_URL}/request`);
  }

  getRequest(_id: string): Observable<request>{
    return this.http.get<request>(this.BASE_URL+ '/request/' +_id);
  }

  createRequest(request: request): Observable<request> {
    return this.http.post<request>(`${this.BASE_URL}/request/create`, request);
  }

  deleteRequest(id: string): Observable<request> {
    console.log(id);
    return this.http.delete<request>(`${this.BASE_URL}/request/${id}`);
  }

  updateRequest(body: any): Observable<request> {
    return this.http.put<request>(this.BASE_URL + '/request/' + body._id,body);
  }
}
