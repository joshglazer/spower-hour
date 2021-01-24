import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NowPlayingInfoComponent } from './now-playing-info.component';

describe('NowPlayingInfoComponent', () => {
  let component: NowPlayingInfoComponent;
  let fixture: ComponentFixture<NowPlayingInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NowPlayingInfoComponent],
    }).compileComponents();
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
