import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details/details.component';
import { MatDialog } from '@angular/material/dialog';
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
  imports: [CommonModule, AsyncPipe, MatIconModule, DetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  itemList$ = new BehaviorSubject<Item[]>([]);

  ngOnInit(): void {
    this.fetchItemList();
  }

  fetchItemList() {
    this.itemList$.next(sourceData as Item[]);
  }

  checkDetails() {
    this.dialog.open(DetailsComponent, {
      width: '80vw',
      height: '80vh',
      disableClose: true,
    });
  }
}
