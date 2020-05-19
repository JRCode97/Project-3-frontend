import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBugReportComponent } from './new-bug-report.component';

describe('NewBugReportComponent', () => {
  let component: NewBugReportComponent;
  let fixture: ComponentFixture<NewBugReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBugReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBugReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
