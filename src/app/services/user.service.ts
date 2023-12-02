import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]>{
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUser(_id: string): Observable<User>{
    return this.http.get<User>(this.BASE_URL+ '/users/' +_id);
  }

  createUser(User: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/users/create`, User);
  }

  deleteUser(id: string): Observable<User> {
    console.log(id);
    return this.http.delete<User>(`${this.BASE_URL}/users/${id}`);
  }

  updateUser(body: any): Observable<User> {
    return this.http.put<User>(this.BASE_URL + '/users/' + body._id,body);
  }

}
