import { Injectable } from '@angular/core';
import { certification } from '../interfaces/certification';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { request } from '../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCertifications(): Observable<any[]>{
    return this.http.get<certification[]>(`${this.BASE_URL}/certification`);
  }

  getCertification(_id: string): Observable<certification>{
    return this.http.get<certification>(this.BASE_URL+ '/certification/' +_id);
  }

  createCertification(certification: certification): Observable<certification> {
    return this.http.post<certification>(`${this.BASE_URL}/certification/create`, certification);
  }

  deleteCertification(id: string): Observable<certification> {
    console.log(id);
    return this.http.delete<certification>(`${this.BASE_URL}/certification/${id}`);
  }

  updateCertification(body: any): Observable<certification> {
    return this.http.put<certification>(this.BASE_URL + '/certification/' + body._id,body);
  }
}
