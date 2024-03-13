import { Component, Input } from '@angular/core';
import { UserLocationComponent } from '../user-location/user-location.component';

@Component({
  selector: 'user-comment',
  standalone: true,
  imports: [UserLocationComponent],
  templateUrl: './user-comment.component.html',
  styleUrl: './user-comment.component.scss'
})
export class UserCommentComponent {
  @Input('size') size: string = 'default'
}

@Component({
  selector: 'user-comment-list',
  standalone: true,
  imports: [UserCommentComponent],
  templateUrl: './user-comment-list.component.html',
  styleUrl: './user-comment-list.component.scss'  
})
export class UserCommentListComponent {

}
