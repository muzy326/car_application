import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent {
  userInput = '';
  messages: any[] = [];
  minimized = true;
  unreadCount = 0;

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.minimized = !this.minimized;

    if (!this.minimized) {
      this.unreadCount = 0; // reset unread
    }

     console.log('Minimized:', this.minimized); // 🔍 debug

    setTimeout(() => this.scrollToBottom(), 0);
  }

  sendMessage() {
    const msg = this.userInput.trim();
    if (!msg) return;

    // User message
    this.messages.push({ text: msg, from: 'user' });
    this.scrollToBottom();

    // API call
    this.http.post<any>('http://localhost:4000/api/chat', { message: msg }).subscribe({
      next: res => {
        this.messages.push({
          text: res.reply || 'Sorry, no reply received',
          from: 'bot'
        });

        if (this.minimized) {
          this.unreadCount++;
        }

        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({
          text: 'Bot is unavailable. Please try later.',
          from: 'bot'
        });

        if (this.minimized) {
          this.unreadCount++;
        }

        this.scrollToBottom();
      }
    });

    this.userInput = '';
  }

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop =
        this.chatBody.nativeElement.scrollHeight;
    } catch {}
  }
}