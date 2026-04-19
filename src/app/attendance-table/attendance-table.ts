import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttendanceRecord } from '../models/attendance-record';

@Component({
  selector: 'app-attendance-table',
  imports: [FormsModule],
  templateUrl: './attendance-table.html',
  styleUrl: './attendance-table.css',
})
export class AttendanceTable {
  searchTerm = signal('');

  sortColumn = signal<keyof AttendanceRecord>('joinTime');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Sample data matching the Zoom CSV structure
  readonly records = signal<AttendanceRecord[]>([
    { name: 'Jen Champagne', email: 'jchampagne@ccresa.org', joinTime: '11/18/2025 08:14 AM', leaveTime: '11/18/2025 09:28 AM', duration: 74, guest: true, inWaitingRoom: true },
    { name: 'Jennifer Roose', email: '', joinTime: '11/18/2025 08:07 AM', leaveTime: '11/18/2025 08:21 AM', duration: 14, guest: false, inWaitingRoom: false },
    { name: 'Mike Anderson', email: 'manderson@school.org', joinTime: '11/18/2025 08:10 AM', leaveTime: '11/18/2025 10:00 AM', duration: 107, guest: true, inWaitingRoom: true },
    { name: 'Sarah Williams', email: 'swilliams@edu.org', joinTime: '11/18/2025 08:20 AM', leaveTime: '11/18/2025 08:35 AM', duration: 15, guest: false, inWaitingRoom: false },
    { name: 'David Chen', email: 'dchen@district.org', joinTime: '11/18/2025 08:05 AM', leaveTime: '11/18/2025 09:45 AM', duration: 100, guest: true, inWaitingRoom: true },
  ]);

  filteredRecords = computed(() => {
    const term = this.searchTerm().toLowerCase();
    let results = this.records();

    if (term) {
      results = results.filter(r =>
        r.name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term)
      );
    }

    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;
    return [...results].sort((a, b) => {
      const valA = a[col];
      const valB = b[col];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * dir;
      }
      return String(valA).localeCompare(String(valB)) * dir;
    });
  });

  sort(column: keyof AttendanceRecord): void {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  sortIcon(column: keyof AttendanceRecord): string {
    if (this.sortColumn() !== column) return '↕';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }
}
