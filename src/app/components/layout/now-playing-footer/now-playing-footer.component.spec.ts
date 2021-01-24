import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NowPlayingFooterComponent } from './now-playing-footer.component';

describe('NowPlayingFooterComponent', () => {
  let component: NowPlayingFooterComponent;
  let fixture: ComponentFixture<NowPlayingFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NowPlayingFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowPlayingFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
