import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesOverviewComponent } from './zones-overview.component';

describe('ZonesOverviewComponent', () => {
  let component: ZonesOverviewComponent;
  let fixture: ComponentFixture<ZonesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonesOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
