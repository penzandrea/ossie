import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesGoupedByRulesComponent } from './issues-gouped-by-rules.component';

describe('IssuesGoupedByRulesComponent', () => {
  let component: IssuesGoupedByRulesComponent;
  let fixture: ComponentFixture<IssuesGoupedByRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesGoupedByRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesGoupedByRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
