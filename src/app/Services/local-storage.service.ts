import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, value: any): void {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  get(key: string): any {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);

    const now = new Date();

    if (now.getTime() > item.expiry) {
      this.remove(key); // Expired
      return null;
    }

    return item.value;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
