import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Comment } from '../interfaces/Comment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string = environment.baseUrl
  private apiUrl: string = `${this.baseUrl}/api/moments`

  constructor(private httpClient: HttpClient) { }

  createComment(data: Comment): Observable<Response<Comment>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`
    return this.httpClient.post<Response<Comment>>(url, data)
  }
}
