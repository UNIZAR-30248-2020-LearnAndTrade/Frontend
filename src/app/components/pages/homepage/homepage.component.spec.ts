import { ComponentFixture, TestBed } from '@angular/core/testing';

import { homepageComponent } from './homepage.component';

describe('homepageComponent', () => {
  let component: homepageComponent;
  let fixture: ComponentFixture<homepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ homepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(homepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
