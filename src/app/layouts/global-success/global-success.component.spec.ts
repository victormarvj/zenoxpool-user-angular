import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSuccessComponent } from './global-success.component';

describe('GlobalSuccessComponent', () => {
  let component: GlobalSuccessComponent;
  let fixture: ComponentFixture<GlobalSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
