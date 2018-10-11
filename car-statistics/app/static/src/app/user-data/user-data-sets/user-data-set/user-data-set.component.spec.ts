import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataSetComponent } from './user-data-set.component';

describe('UserDataSetComponent', () => {
  let component: UserDataSetComponent;
  let fixture: ComponentFixture<UserDataSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
