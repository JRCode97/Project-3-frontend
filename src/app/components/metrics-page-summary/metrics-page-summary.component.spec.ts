import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsPageSummaryComponent } from './metrics-page-summary.component';

describe('MetricsPageSummaryComponent', () => {
  let component: MetricsPageSummaryComponent;
  let fixture: ComponentFixture<MetricsPageSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsPageSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsPageSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
