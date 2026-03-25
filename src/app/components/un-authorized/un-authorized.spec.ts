import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorized } from './un-authorized';

describe('UnAuthorized', () => {
  let component: UnAuthorized;
  let fixture: ComponentFixture<UnAuthorized>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthorized]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnAuthorized);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
