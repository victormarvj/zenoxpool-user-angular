import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TawkLiveChatService {
  private isLoaded = false;

  constructor() {}

  loadTawkTo(): void {
    if (this.isLoaded) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/683741a5d101b9190c7c8cdb/1isbtgsqj';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    script.onload = () => {
      console.log('Tawk.to script loaded');
    };

    document.head.appendChild(script);
    this.isLoaded = true;
  }
}
