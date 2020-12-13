import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadConfirmComponent } from './file-upload-confirm.component';

describe('FileUploadConfirmComponent', () => {
  let component: FileUploadConfirmComponent;
  let fixture: ComponentFixture<FileUploadConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
