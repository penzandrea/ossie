import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesGoupedByComponentsComponent } from './issues-gouped-by-components.component';

describe('IssuesGoupedByComponentsComponent', () => {
  let component: IssuesGoupedByComponentsComponent;
  let fixture: ComponentFixture<IssuesGoupedByComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesGoupedByComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesGoupedByComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
