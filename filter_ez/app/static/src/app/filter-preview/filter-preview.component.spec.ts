import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPreviewComponent } from './filter-preview.component';

describe('FilterPreviewComponent', () => {
  let component: FilterPreviewComponent;
  let fixture: ComponentFixture<FilterPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
