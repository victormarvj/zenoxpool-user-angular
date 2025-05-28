import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCodesComponent } from './admin-codes.component';

describe('AdminCodesComponent', () => {
  let component: AdminCodesComponent;
  let fixture: ComponentFixture<AdminCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCodesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
