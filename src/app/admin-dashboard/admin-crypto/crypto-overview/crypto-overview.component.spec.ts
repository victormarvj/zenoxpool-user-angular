import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoOverviewComponent } from './crypto-overview.component';

describe('CryptoOverviewComponent', () => {
  let component: CryptoOverviewComponent;
  let fixture: ComponentFixture<CryptoOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
