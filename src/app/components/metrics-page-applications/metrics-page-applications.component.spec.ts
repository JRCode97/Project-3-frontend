import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsPageApplicationsComponent } from './metrics-page-applications.component';

describe('MetricsPageApplicationsComponent', () => {
  let component: MetricsPageApplicationsComponent;
  let fixture: ComponentFixture<MetricsPageApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsPageApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsPageApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
