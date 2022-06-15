import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityPriceUpdateComponent } from './commodity-price-update.component';

describe('CommodityPriceUpdateComponent', () => {
  let component: CommodityPriceUpdateComponent;
  let fixture: ComponentFixture<CommodityPriceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityPriceUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityPriceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
