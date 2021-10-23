import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFooterComponent } from './content-footer.component';

describe('ContentFooterComponent', () => {
  let component: ContentFooterComponent;
  let fixture: ComponentFixture<ContentFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
