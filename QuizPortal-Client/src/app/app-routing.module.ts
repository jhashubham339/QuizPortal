import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guard/admin.guard';
import { UserGuard } from './services/guard/user.guard';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { AdminHomepageComponent } from './pages/admin/admin-homepage/admin-homepage.component';
import { AdminViewCategoriesComponent } from './pages/admin/admin-view-categories/admin-view-categories.component';
import { AdminAddCategoriesComponent } from './pages/admin/admin-add-categories/admin-add-categories.component';

const routes: Routes = [
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path :'admin-dashboard',
    component : AdminDashboardComponent,
    canActivate : [AdminGuard],
    children :[
      {
        path : '',
        component : AdminHomepageComponent
      },
      {
        path : 'profile',
        component : AdminProfileComponent
      },
      {
        path : 'view-categories',
        component : AdminViewCategoriesComponent
      },
      {
        path : 'add-categories',
        component : AdminAddCategoriesComponent
      }
    ]
  },
  {
    path : 'user-dashboard',
    component : UserDashboardComponent,
    canActivate : [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
