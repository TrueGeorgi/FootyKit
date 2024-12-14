import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedPostsComponent } from './posted-posts.component';

describe('PostedPostsComponent', () => {
  let component: PostedPostsComponent;
  let fixture: ComponentFixture<PostedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostedPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
