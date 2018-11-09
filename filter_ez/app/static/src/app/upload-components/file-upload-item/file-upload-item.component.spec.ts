import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadItemComponent } from './file-upload-item.component';

describe('FileUploadItemComponent', () => {
  let component: FileUploadItemComponent;
  let fixture: ComponentFixture<FileUploadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
