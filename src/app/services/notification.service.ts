import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:3000'; // Replace this with your API URL

  constructor(private http: HttpClient) {}

  getNotifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/notification/${userId}`);
  }
}
