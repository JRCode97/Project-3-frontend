import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBugsPageComponent } from './view-bugs-page.component';

describe('ViewBugsPageComponent', () => {
  let component: ViewBugsPageComponent;
  let fixture: ComponentFixture<ViewBugsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBugsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBugsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
