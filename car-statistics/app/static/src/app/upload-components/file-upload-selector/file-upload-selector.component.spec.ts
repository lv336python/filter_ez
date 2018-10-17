import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadSelectorComponent } from './file-upload-selector.component';

describe('FileUploadSelectorComponent', () => {
  let component: FileUploadSelectorComponent;
  let fixture: ComponentFixture<FileUploadSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
