import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  login(email:string, password:string) {
    return this.http.post<{access_token:  string}>(`${this.BASE_URL}/auth/signin`, {email, password}).pipe(tap(res => {
    localStorage.setItem('access_token', res.access_token);
}))
}
register(email:string, password:string) {
  return this.http.post<{access_token: string}>(`${this.BASE_URL}/auth/signin`, {email, password}).pipe(tap(res => {
  this.login(email, password)
}))
}
logout() {
  localStorage.removeItem('access_token');
}
public get loggedIn(): boolean{
  return localStorage.getItem('access_token') !==  null;
}
}
