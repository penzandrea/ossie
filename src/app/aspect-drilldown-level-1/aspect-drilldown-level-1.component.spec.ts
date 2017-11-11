import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectDrilldownLevel1Component } from './aspect-drilldown-level-1.component';

describe('AspectDrilldownLevel1Component', () => {
  let component: AspectDrilldownLevel1Component;
  let fixture: ComponentFixture<AspectDrilldownLevel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspectDrilldownLevel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectDrilldownLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
