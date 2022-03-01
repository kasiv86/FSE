import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingareaComponent } from './biddingarea.component';

describe('BiddingareaComponent', () => {
  let component: BiddingareaComponent;
  let fixture: ComponentFixture<BiddingareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
