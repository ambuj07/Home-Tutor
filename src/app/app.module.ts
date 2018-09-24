import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormWizardModule } from 'angular2-wizard';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { FormsModule }   from '@angular/forms';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { NearbyTutorsComponent } from './nearby-tutors/nearby-tutors.component';
import { TutorRegistrationComponent } from './tutor-registration/tutor-registration.component';
import { NearbyStudendsComponent } from './nearby-studends/nearby-studends.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TutorialComponent,
    StudentRegistrationComponent,
    NearbyTutorsComponent,
    TutorRegistrationComponent,
    NearbyStudendsComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormWizardModule,
    RouterModule.forRoot([
      {
         path: '',
         component: TutorialComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path: 'studentRegistration',
        component: StudentRegistrationComponent
      },
      {
        path : 'nearbyTutors',
        component : NearbyTutorsComponent
      },
      {
        path : 'tutorRegistration',
        component : TutorRegistrationComponent
      },
      {
        path : 'nearbyStudents',
        component : NearbyStudendsComponent
      },
      {
        path : 'profile',
        component : ProfileComponent
      }
   ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
