import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionApprovalComponent } from './solution-approval.component';

describe('SolutionApprovalComponent', () => {
  let component: SolutionApprovalComponent;
  let fixture: ComponentFixture<SolutionApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
