import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOverviewComponent } from './code-overview.component';

describe('CodeOverviewComponent', () => {
  let component: CodeOverviewComponent;
  let fixture: ComponentFixture<CodeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
