import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import sourceData from './data';

interface Item {
  id: number;
  name: string;
  photos: string[];
  content: string;
  tag: string;
  nickname: string;
  avatar: string;
  starCount: number;
  favorite: boolean;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  itemList$ = new BehaviorSubject<Item[]>([]);

  ngOnInit(): void {
    this.fetchItemList();
  }

  fetchItemList() {
    this.itemList$.next(sourceData as Item[]);
  }
}
