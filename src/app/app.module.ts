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
import { ProfileComponent } from './profile/profile.component';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { FindMoreTutorsComponent } from './find-more-tutors/find-more-tutors.component';
import { TutorMenuComponent } from './tutor-menu/tutor-menu.component';
import { UpdateTutorProfileComponent } from './update-tutor-profile/update-tutor-profile.component';
import { UpdateClassAndSubjectComponent } from './update-tutor-profile/update-class-and-subject/update-class-and-subject.component';
import { UpdateEducationQualificationComponent } from './update-tutor-profile/update-education-qualification/update-education-qualification.component';
import { UpdateWorkLocationComponent } from './update-tutor-profile/update-work-location/update-work-location.component';
import { UpdateWorkExperienceComponent } from './update-tutor-profile/update-work-experience/update-work-experience.component';
import { UpdateTutorAddressComponent } from './update-tutor-profile/update-tutor-address/update-tutor-address.component';
import { StudentMenuComponent } from './student-menu/student-menu.component';
import { StudentUpdateStatusComponent } from './student-update-status/student-update-status.component';
import { ReviewByStudentComponent } from './review-by-student/review-by-student.component'


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
    ProfileComponent,
    TutorProfileComponent,
    DashboardComponent,
    FindJobsComponent,
    StudentDashboardComponent,
    FindMoreTutorsComponent,
    TutorMenuComponent,
    UpdateTutorProfileComponent,
    UpdateClassAndSubjectComponent,
    UpdateEducationQualificationComponent,
    UpdateWorkLocationComponent,
    UpdateWorkExperienceComponent,
    UpdateTutorAddressComponent,
    StudentMenuComponent,
    StudentUpdateStatusComponent,
    ReviewByStudentComponent
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
        path : 'logout',
        component : TutorialComponent
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
        path : 'profile/student/:id',
        component : ProfileComponent
      },
      {
        path : 'profile/student/:id',
        component : ProfileComponent
      },
      {
        path : 'postNewRequirement/:id',
        component : FindMoreTutorsComponent
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
        path : 'profile/tutor/:id',
        component : TutorProfileComponent
      },
      {
        path : 'dashboard/tutor/:id',
        component : DashboardComponent
      },
      {
        path : 'dashboard/student/:id',
        component : StudentDashboardComponent
      },
      {
        path : 'profile/tutor/:id',
        component : TutorProfileComponent
      },
      {
        path : 'findJobs/tutor/:id',
        component : FindJobsComponent
      },
      {
        path : 'editProfile/tutor/:id',
        component : UpdateTutorProfileComponent
      },
      {
        path : 'tutor/classAndSubject/:id',
        component : UpdateClassAndSubjectComponent
      },
      {
        path : 'tutor/education/:id',
        component : UpdateEducationQualificationComponent
      },
      {
        path : 'tutor/workLocation/:id',
        component : UpdateWorkLocationComponent
      },
      {
        path : 'tutor/experience/:id',
        component : UpdateWorkExperienceComponent
      },
      {
        path : 'tutor/address/:id',
        component : UpdateTutorAddressComponent
      },
      {
        path : 'student/updateStatus/:id',
        component : StudentUpdateStatusComponent
      },
      {
        path : 'student/review/:id',
        component : ReviewByStudentComponent
      },
      {
        path: '**',
        redirectTo : ''
     },
   ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
