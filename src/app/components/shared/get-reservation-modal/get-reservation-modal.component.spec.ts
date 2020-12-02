import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReservationModalComponent } from './get-reservation-modal.component';

describe('GetReservationModalComponent', () => {
  let component: GetReservationModalComponent;
  let fixture: ComponentFixture<GetReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReservationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
