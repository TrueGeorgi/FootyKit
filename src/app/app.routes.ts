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

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'home/:id', component: SinglePostComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},  
    {path: 'createPost', component: CreatePostComponent},
    {path: 'profile', component: ProfilePanelComponent},
    {path: 'about-me', component: AboutMeComponent},
    {path: 'posted-posts', component: PostedPostsComponent},
    {path: '**', component: NotFoundComponent},  
];
