import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function LogInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  console.log(next);
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log(event.clone().body)
      }
    })
  );
}
