import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearDetailComponent } from './bear-detail.component';

describe('BearDetailComponent', () => {
  let component: BearDetailComponent;
  let fixture: ComponentFixture<BearDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
