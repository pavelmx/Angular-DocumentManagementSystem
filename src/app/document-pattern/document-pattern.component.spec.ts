import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPatternComponent } from './document-pattern.component';

describe('DocumentPatternComponent', () => {
  let component: DocumentPatternComponent;
  let fixture: ComponentFixture<DocumentPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
