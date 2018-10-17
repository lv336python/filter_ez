import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFileComponent } from './user-file.component';

describe('UserFileComponent', () => {
  let component: UserFileComponent;
  let fixture: ComponentFixture<UserFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
