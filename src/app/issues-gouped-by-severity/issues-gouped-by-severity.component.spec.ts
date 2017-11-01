import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesGoupedBySeverityComponent } from './issues-gouped-by-severity.component';

describe('IssuesGoupedBySeverityComponent', () => {
  let component: IssuesGoupedBySeverityComponent;
  let fixture: ComponentFixture<IssuesGoupedBySeverityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesGoupedBySeverityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesGoupedBySeverityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
