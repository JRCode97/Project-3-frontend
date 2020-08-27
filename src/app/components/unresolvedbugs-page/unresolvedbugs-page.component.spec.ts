import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnresolvedbugsPageComponent } from './unresolvedbugs-page.component';

describe('UnresolvedbugsPageComponent', () => {
  let component: UnresolvedbugsPageComponent;
  let fixture: ComponentFixture<UnresolvedbugsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnresolvedbugsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnresolvedbugsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
