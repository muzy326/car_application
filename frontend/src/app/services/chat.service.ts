import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChatResponse } from '../../core/models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private chatUrl = `${environment.apiUrl}/chat`;
  private aiBookUrl = `${environment.apiUrl}/ai/book`;

  constructor(private http: HttpClient) {}

  sendMessage(message: string, sessionId: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.chatUrl, { message, sessionId });
  }

  sendBookingMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.aiBookUrl, { message });
  }
}