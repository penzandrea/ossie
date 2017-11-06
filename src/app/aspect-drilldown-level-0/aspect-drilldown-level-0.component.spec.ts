import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectDrilldownLevel0Component } from './aspect-drilldown-level-0.component';

describe('AspectDrilldownLevel0Component', () => {
  let component: AspectDrilldownLevel0Component;
  let fixture: ComponentFixture<AspectDrilldownLevel0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspectDrilldownLevel0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectDrilldownLevel0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
