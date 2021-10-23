import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWeTradeComponent } from './what-we-trade.component';

describe('WhatWeTradeComponent', () => {
  let component: WhatWeTradeComponent;
  let fixture: ComponentFixture<WhatWeTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatWeTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatWeTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
