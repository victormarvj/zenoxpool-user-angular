import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBalanceComponent } from './edit-balance.component';

describe('EditBalanceComponent', () => {
  let component: EditBalanceComponent;
  let fixture: ComponentFixture<EditBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
