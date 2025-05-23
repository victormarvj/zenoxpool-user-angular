import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;

  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.loader$.subscribe((val) => (this.isLoading = val));
  }
}
