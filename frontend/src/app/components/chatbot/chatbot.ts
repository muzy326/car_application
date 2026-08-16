import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent {
  userInput = '';
  messages: { text: string; from: 'user' | 'bot' }[] = [];
  minimized = true;
  unreadCount = 0;
  loading = false;

  // Keep one sessionId per chat session (persists across messages in this window)
  sessionId = `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  private readonly bookingKeywords = ['book', 'reserve', 'confirm booking', 'rent it'];

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  toggleChat() {
    this.minimized = !this.minimized;
    if (!this.minimized) this.unreadCount = 0;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private looksLikeBooking(message: string): boolean {
    const lower = message.toLowerCase();
    return this.bookingKeywords.some(k => lower.includes(k));
  }

  sendMessage() {
    const msg = this.userInput.trim();
    if (!msg) return;

    // User message
    this.messages.push({ text: msg, from: 'user' });
    this.userInput = '';
    this.scrollToBottom();

    const wantsToBook = this.looksLikeBooking(msg);

    // Booking requires login — nudge instead of silently falling back to chit-chat
    if (wantsToBook && !this.authService.isLoggedIn()) {
      this.messages.push({
        text: 'Please log in first so I can book this for you.',
        from: 'bot'
      });
      if (this.minimized) this.unreadCount++;
      this.scrollToBottom();
      return;
    }

    this.loading = true;

    const request$ = wantsToBook
      ? this.chatService.sendBookingMessage(msg)
      : this.chatService.sendMessage(msg, this.sessionId);

    request$.subscribe({
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