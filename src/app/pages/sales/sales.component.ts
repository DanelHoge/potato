import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { SalesStore } from '../../stores/sales.store';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [ CommonModule, TableModule, InputTextModule, FormsModule, NgForOf, HeaderComponent, CheckboxModule ],
  templateUrl: './sales.component.html'
})

export class SalesComponent implements OnInit {
  store = inject(SalesStore);

  // http = inject(HttpClient);
  // columns: any[] = [];
  // data: any[] = [];
  searchString = '';

  // ngOnInit() {
  //   this.http.get<any>('/data-sales.json').subscribe((res) => {
  //
  //     console.log("Res: ", res);
  //
  //     this.columns = res.column;
  //     this.data = res.data;
  //   });
  // }

  toggleSync() {
    this.store.toggleSync()
  }

  ngOnInit() {
    this.store.getData(this.store.sync());
  }

  get columns() {
    return this.store.columns();
  }

  get data() {
    return this.store.data();
  }

  get hasSubHeaders(): boolean {
    return this.columns.some(col => col.subHeaders);
  }

  get salesSubHeaders(): any[] {
    return this.columns.find(col => col.header === 'Sales')?.subHeaders ?? [];
  }

  getTotal(row: any): number {
    const subHeaders = this.columns.find(col => col.header === 'Sales')?.subHeaders || [];
    return subHeaders.reduce((total: number, sub: any) => {
      return total + (row[sub.field] || 0);
    }, 0);
  }

  onSearch(event: Event, dt: any) {
    const input = event.target as HTMLInputElement;
    this.searchString = input.value;
    dt.filterGlobal(input.value, 'contains');
  }

}
