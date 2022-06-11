/* It's a service that provides methods to create, read, update, and delete moments */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Moment } from '../interfaces/Moment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseUrl: string = environment.baseUrl
  private apiUrl: string = `${this.baseUrl}/api/moments`

  constructor(private httpClient: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
    return this.httpClient.post<FormData>(this.apiUrl, formData)
  }

  getMoments(): Observable<Response<Moment[]>> {
    return this.httpClient.get<Response<Moment[]>>(this.apiUrl)
  }

  getMoment(id: number): Observable<Response<Moment>> {
    return this.httpClient.get<Response<Moment>>(`${this.apiUrl}/${id}`)
  }

  removeMoment(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    return this.httpClient.put<FormData>(`${this.apiUrl}/${id}`, formData)
  }
}
