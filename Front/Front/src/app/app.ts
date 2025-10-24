import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],  // ← IMPORTANT !
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Front';
}