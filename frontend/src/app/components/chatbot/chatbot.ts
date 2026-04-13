import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent {
  userInput = '';
  messages: { text: string; from: 'user' | 'bot' }[] = [];
  minimized = true;
  unreadCount = 0;
  loading = false;

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.minimized = !this.minimized;
    if (!this.minimized) this.unreadCount = 0;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  sendMessage() {
    const msg = this.userInput.trim();
    if (!msg) return;

    // User message
    this.messages.push({ text: msg, from: 'user' });
    this.userInput = '';
    this.scrollToBottom();

    // API call
    this.loading = true;
    this.http.post<any>('http://localhost:3000/api/chat', { message: msg }).subscribe({
      next: res => {
        this.loading = false;
        const reply = res.reply || 'Sorry, no reply.';
        this.messages.push({ text: reply, from: 'bot' });

        if (this.minimized) this.unreadCount++;
        this.scrollToBottom();
      },
      error: () => {
        this.loading = false;
        this.messages.push({
          text: 'Bot unavailable. Try later.',
          from: 'bot'
        });
        if (this.minimized) this.unreadCount++;
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch {}
  }
}