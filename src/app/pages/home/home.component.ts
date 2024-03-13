import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { Item } from '../../../interfaces';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatIconModule, DetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private http: HttpService,
    private router: Router
  ) {}

  itemList$ = new BehaviorSubject<Item[]>([]);

  ngOnInit(): void {
    this.fetchItemList();
  }

  fetchItemList() {
    this.http.get('/data').subscribe((res: any) => {
      const data = res.data.map((item: any) => {
        return {
          ...item,
          tag: '',
          nickname: 'user',
          avatar:
            'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30p0p4pj53s005nnkhvggbsn9977q9mg?imageView2/2/w/60/format/webp|imageMogr2/strip',
          starCount: 100,
          favorite: false,
          reGenerated: false,
        };
      });
      this.itemList$.next(data as Item[]);
    });
  }

  checkDetails(id: string) {
    this.router.navigate(['review', id])
    // this.dialog.open(DetailsComponent, {
    //   width: '80vw',
    //   height: '80vh',
    //   disableClose: true,
    // });
  }
}
