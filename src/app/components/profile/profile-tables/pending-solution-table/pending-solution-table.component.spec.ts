import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { PendingSolutionTableComponent } from './pending-solution-table.component';

describe('PendingSolutionTableComponent', () => {
  let component: PendingSolutionTableComponent;
  let fixture: ComponentFixture<PendingSolutionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingSolutionTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingSolutionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
