import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  BASE_URL: string = 'http://localhost:3000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  roleAs:any
  constructor(private http: HttpClient, public router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  signUp(User: any): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/signup`, User);
  }
  signUpAdmin(User: any): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/signAdmin`, User);
  }

  // Sign-in
  signIn(user :any) {

    return this.http
      .post<User>(`${this.BASE_URL}/signin`, user)

  }
  getToken() {
    return localStorage.getItem('token');
  }
 /* get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }*/
  isLoggedIn():boolean{
 let authToken=localStorage.getItem('token');
 if(authToken!=null){
   return true
 }
 return false
  }
  doLogout() {
    let removeToken = localStorage.removeItem('token');
localStorage.clear();
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  /*getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }*/
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  getRole(){

      this.roleAs = localStorage.getItem('user');
      this.roleAs = JSON.parse(this.roleAs);

      return this.roleAs.role;
    }
}
