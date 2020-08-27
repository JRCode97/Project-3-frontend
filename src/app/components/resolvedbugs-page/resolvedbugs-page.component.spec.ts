import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedbugsPageComponent } from './resolvedbugs-page.component';

describe('ResolvedbugsPageComponent', () => {
  let component: ResolvedbugsPageComponent;
  let fixture: ComponentFixture<ResolvedbugsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedbugsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedbugsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
