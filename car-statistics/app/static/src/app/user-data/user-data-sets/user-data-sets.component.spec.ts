import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataSetsComponent } from './user-data-sets.component';

describe('UserDataSetsComponent', () => {
  let component: UserDataSetsComponent;
  let fixture: ComponentFixture<UserDataSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
