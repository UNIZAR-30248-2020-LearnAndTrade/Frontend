import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmImpartedLessonModalComponent } from './confirm-imparted-lesson-modal.component';

describe('ConfirmImpartedLessonModalComponent', () => {
  let component: ConfirmImpartedLessonModalComponent;
  let fixture: ComponentFixture<ConfirmImpartedLessonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmImpartedLessonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmImpartedLessonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
