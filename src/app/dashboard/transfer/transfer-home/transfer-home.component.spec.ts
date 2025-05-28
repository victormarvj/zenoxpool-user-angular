import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHomeComponent } from './transfer-home.component';

describe('TransferHomeComponent', () => {
  let component: TransferHomeComponent;
  let fixture: ComponentFixture<TransferHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
