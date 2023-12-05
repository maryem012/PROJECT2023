import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private surveysUrl = 'http://localhost:3000/survey'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>('http://localhost:3000/survey/upload', formData);
  }

  getSurvey(filename: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/survey/${filename}`);
  }

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.surveysUrl);
  }

  getSurveyData(surveyId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/survey/${surveyId}`);
  }

  saveSurveyResults(dataToSave: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/survey/save-results', dataToSave);
  }
}
