import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProcessComponent } from './upload-process.component';

describe('UploadProcessComponent', () => {
  let component: UploadProcessComponent;
  let fixture: ComponentFixture<UploadProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
