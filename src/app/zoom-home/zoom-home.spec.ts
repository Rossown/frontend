import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomHome } from './zoom-home';

describe('ZoomHome', () => {
  let component: ZoomHome;
  let fixture: ComponentFixture<ZoomHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
