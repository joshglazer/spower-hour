import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowPlayingInfoComponent } from './now-playing-info.component';

describe('NowPlayingInfoComponent', () => {
  let component: NowPlayingInfoComponent;
  let fixture: ComponentFixture<NowPlayingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowPlayingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowPlayingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
