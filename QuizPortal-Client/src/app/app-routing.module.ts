import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guard/admin.guard';
import { UserGuard } from './services/guard/user.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { HomepageComponent } from './pages/admin/homepage/homepage.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { UpdateCategoriesComponent } from './pages/admin/update-categories/update-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';

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
    component : DashboardComponent,
    canActivate : [AdminGuard],
    children :[
      {
        path : '',
        component : HomepageComponent
      },
      {
        path : 'profile',
        component : ProfileComponent
      },
      {
        path : 'view-categories',
        component : ViewCategoriesComponent
      },
      {
        path : 'add-categories',
        component : AddCategoriesComponent
      },
      {
        path :'view-categories/update-categories/:cId',
        component : UpdateCategoriesComponent
      },
      {
        path :"view-quizzes",
        component : ViewQuizzesComponent
      },
      {
        path :"add-quizzes",
        component : AddQuizComponent
      },
      {
        path :"view-quizzes/update-quiz/:qId",
        component : UpdateQuizComponent
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
