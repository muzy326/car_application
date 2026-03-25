import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBill } from './booking-bill';

describe('BookingBill', () => {
  let component: BookingBill;
  let fixture: ComponentFixture<BookingBill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingBill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingBill);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
