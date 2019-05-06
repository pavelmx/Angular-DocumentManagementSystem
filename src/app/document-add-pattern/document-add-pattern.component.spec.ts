import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddPatternComponent } from './document-add-pattern.component';

describe('DocumentAddPatternComponent', () => {
  let component: DocumentAddPatternComponent;
  let fixture: ComponentFixture<DocumentAddPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentAddPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentAddPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
