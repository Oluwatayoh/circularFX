import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommodityComponent } from './new-commodity.component';

describe('NewCommodityComponent', () => {
  let component: NewCommodityComponent;
  let fixture: ComponentFixture<NewCommodityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCommodityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
