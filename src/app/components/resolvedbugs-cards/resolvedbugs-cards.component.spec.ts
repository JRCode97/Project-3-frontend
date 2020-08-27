import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedbugsCardsComponent } from './resolvedbugs-cards.component';

describe('ResolvedbugsCardsComponent', () => {
  let component: ResolvedbugsCardsComponent;
  let fixture: ComponentFixture<ResolvedbugsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedbugsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedbugsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
