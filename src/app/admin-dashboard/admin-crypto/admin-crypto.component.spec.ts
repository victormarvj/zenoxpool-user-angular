import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCryptoComponent } from './admin-crypto.component';

describe('AdminCryptoComponent', () => {
  let component: AdminCryptoComponent;
  let fixture: ComponentFixture<AdminCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCryptoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
