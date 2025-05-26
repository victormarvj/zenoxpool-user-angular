import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBankDepositComponent } from './pending-bank-deposit.component';

describe('PendingBankDepositComponent', () => {
  let component: PendingBankDepositComponent;
  let fixture: ComponentFixture<PendingBankDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingBankDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingBankDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
