import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasFeeComponent } from './gas-fee.component';

describe('GasFeeComponent', () => {
  let component: GasFeeComponent;
  let fixture: ComponentFixture<GasFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
