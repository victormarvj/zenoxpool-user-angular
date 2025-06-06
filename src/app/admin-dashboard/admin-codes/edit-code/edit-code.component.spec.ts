import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCodeComponent } from './edit-code.component';

describe('EditCodeComponent', () => {
  let component: EditCodeComponent;
  let fixture: ComponentFixture<EditCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
