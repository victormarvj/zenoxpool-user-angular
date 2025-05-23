import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCryptoComponent } from './new-crypto.component';

describe('NewCryptoComponent', () => {
  let component: NewCryptoComponent;
  let fixture: ComponentFixture<NewCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCryptoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
