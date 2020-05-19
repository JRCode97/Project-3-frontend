import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageBugComponent } from './main-page-bug.component';

describe('MainPageBugComponent', () => {
  let component: MainPageBugComponent;
  let fixture: ComponentFixture<MainPageBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
