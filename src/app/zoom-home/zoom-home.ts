import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { AttendanceTable } from '../attendance-table/attendance-table';

@Component({
  selector: 'app-zoom-home',
  imports: [AttendanceTable],
  standalone: true,
  templateUrl: './zoom-home.html',
  styleUrl: './zoom-home.css',
})
export class ZoomHome implements OnInit {
  message = '';

  constructor(private api: Api) {}

  ngOnInit(): void {}

  ping(): void {
    this.api.ping().subscribe({
      next: (response) => {
        this.message = response;
      },
      error: (err) => {
        console.error('Error pinging API:', err);

        if (err.status) {
          this.message = `Error ${err.status}: ${err.statusText}`;
        } else {
          this.message = 'An unknown error occurred while pinging the API.';
        }
      }
    });
  }
}
