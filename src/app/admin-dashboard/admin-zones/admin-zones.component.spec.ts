import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminZonesComponent } from './admin-zones.component';

describe('AdminZonesComponent', () => {
  let component: AdminZonesComponent;
  let fixture: ComponentFixture<AdminZonesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminZonesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
