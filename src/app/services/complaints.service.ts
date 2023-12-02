import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { complaint } from '../interfaces/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getComplaints(): Observable<any[]>{
    return this.http.get<complaint[]>(`${this.BASE_URL}/complaint`);
  }

  getComplaint(_id: string): Observable<complaint>{
    return this.http.get<complaint>(this.BASE_URL+ '/complaint/' +_id);
  }

  createComplaint(complaint: complaint): Observable<complaint> {
    return this.http.post<complaint>(`${this.BASE_URL}/complaint/create`, complaint);
  }

  deleteComplaint(id: string): Observable<complaint> {
    console.log(id);
    return this.http.delete<complaint>(`${this.BASE_URL}/complaint/${id}`);
  }

  updateComplaint(body: any): Observable<complaint> {
    return this.http.put<complaint>(this.BASE_URL + '/complaint/' + body._id,body);
  }
}
