import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabeticalScrollBarComponent } from './alphabetical-scroll-bar.component';

describe('AlphabeticalScrollBarComponent', () => {
  let component: AlphabeticalScrollBarComponent;
  let fixture: ComponentFixture<AlphabeticalScrollBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphabeticalScrollBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabeticalScrollBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
