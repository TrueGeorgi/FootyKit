import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ProfilePanelComponent } from './components/user/profile-panel/profile-panel.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { PostedPostsComponent } from './pages/posted-posts/posted-posts.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'home/:id', component: SinglePostComponent, canActivate: [authGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},  
    {path: 'createPost', component: CreatePostComponent, canActivate: [authGuard]},
    {path: 'profile', component: ProfilePanelComponent, canActivate: [authGuard]},
    {path: 'about-me', component: AboutMeComponent},
    {path: 'posted-posts', component: PostedPostsComponent, canActivate: [authGuard]},
    {path: '**', component: NotFoundComponent},  
];
