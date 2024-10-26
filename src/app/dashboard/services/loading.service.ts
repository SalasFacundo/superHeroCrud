import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = signal(false);

  get isLoading() {
    return this.loading;
  }

  show() {
    this.loading.set(true);
  }

  hide() {
    this.loading.set(false);
  }
}
