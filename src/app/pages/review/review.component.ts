import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SwiperComponent } from '../../components/swiper/swiper.component';
import { HttpService } from '../../service/http.service';
import { Item } from '../../../interfaces';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    SwiperComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormField,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private auth: AuthService
  ) {}

  cardInfo: Item = {
    comments: null,
    content: '',
    created_at: '',
    id: '',
    img_urls: [],
    prompt: '',
    tags: '',
    title: '',
    updated_at: '',
    tag: '',
    nickname: '',
    avatar: '',
    starCount: 0,
    favorite: false,
    reGenerated: false,
  };
  rejectReason = '';
  showRejectContent = false;
  reviewSummary = {
    accept: 3,
    reject: 5,
  };

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`/data/${id}`).subscribe((res: any) => {
      this.cardInfo = {
        ...res,
        tag: '',
        nickname: 'user',
        avatar:
          'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30p0p4pj53s005nnkhvggbsn9977q9mg?imageView2/2/w/60/format/webp|imageMogr2/strip',
        starCount: 100,
        favorite: false,
        reGenerated: false,
      };
    });
  }

  cancel() {
    this.router.navigate(['']);
  }

  accept() {
    this.auth.loginWithRedirect();
  }

  reject() {
    this.showRejectContent = true;
    this.rejectReason = '';
  }

  finish() {
    const { accept, reject } = this.reviewSummary;
    this.router.navigate(['/finish'], { queryParams: { accept, reject } });
  }
}
