import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar';
import { FooterComponent } from './components/footer/footer';
import { ChatbotComponent } from './components/chatbot/chatbot';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FooterComponent, ChatbotComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // optional
})
export class AppComponent {}