import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCryptoTransfersComponent } from './pending-crypto-transfers.component';

describe('PendingCryptoTransfersComponent', () => {
  let component: PendingCryptoTransfersComponent;
  let fixture: ComponentFixture<PendingCryptoTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCryptoTransfersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCryptoTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
