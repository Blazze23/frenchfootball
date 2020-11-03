import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopscorersComponent } from './topscorers.component';

describe('TopscorersComponent', () => {
  let component: TopscorersComponent;
  let fixture: ComponentFixture<TopscorersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopscorersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopscorersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
