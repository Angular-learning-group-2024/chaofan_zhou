import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LogInterceptor } from './shared/interceptor';
import { AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([LogInterceptor])),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'dev-rp7izxz0tx0rlbja.us.auth0.com',
        clientId: 'F785Spd8LokWUyI4G5ceReJQw8BC27Pr',
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      })
    ),
    // importProvidersFrom(HttpClientModule),
  ],
};
