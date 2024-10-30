import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './dashboard/interceptors/loading.interceptor';
import { BrowserAnimationsModule, NoopAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule, NoopAnimationsModule]),
    provideHttpClient(
      withFetch(),
      withInterceptors([LoadingInterceptor])
    )]
};
