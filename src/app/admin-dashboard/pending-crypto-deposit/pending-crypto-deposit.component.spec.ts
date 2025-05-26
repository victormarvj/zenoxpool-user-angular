import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCryptoDepositComponent } from './pending-crypto-deposit.component';

describe('PendingCryptoDepositComponent', () => {
  let component: PendingCryptoDepositComponent;
  let fixture: ComponentFixture<PendingCryptoDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCryptoDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCryptoDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
