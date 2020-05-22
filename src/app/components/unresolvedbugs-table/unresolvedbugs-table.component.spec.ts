import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { UnresolvedbugsTableComponent } from './unresolvedbugs-table.component';

describe('UnresolvedbugsTableComponent', () => {
  let component: UnresolvedbugsTableComponent;
  let fixture: ComponentFixture<UnresolvedbugsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnresolvedbugsTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnresolvedbugsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
