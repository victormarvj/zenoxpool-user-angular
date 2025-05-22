import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminOverviewComponent } from './admin-overview.component';

describe('OverviewComponent', () => {
  let component: AdminOverviewComponent;
  let fixture: ComponentFixture<AdminOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOverviewComponent],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
