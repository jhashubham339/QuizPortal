import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { HomepageComponent } from './pages/admin/homepage/homepage.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { UpdateCategoriesComponent } from './pages/admin/update-categories/update-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { InstructionComponent } from './pages/user/instruction/instruction.component';
import { LoadAllQuizComponent } from './pages/user/load-all-quiz/load-all-quiz.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    UserDashboardComponent,
    SidebarComponent,
    ProfileComponent,
    HomepageComponent,
    ViewCategoriesComponent,
    AddCategoriesComponent,
    UpdateCategoriesComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    AddQuestionComponent,
    ViewQuestionsComponent,
    UpdateQuestionComponent,
    UserSidebarComponent,
    InstructionComponent,
    LoadAllQuizComponent,
    StartQuizComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    NgxUiLoaderModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide :HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
