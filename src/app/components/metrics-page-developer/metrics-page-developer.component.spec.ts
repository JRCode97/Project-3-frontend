import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsPageDeveloperComponent } from './metrics-page-developer.component';

describe('MetricsPageDeveloperComponent', () => {
  let component: MetricsPageDeveloperComponent;
  let fixture: ComponentFixture<MetricsPageDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsPageDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsPageDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
