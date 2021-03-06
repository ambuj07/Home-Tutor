import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormWizardModule } from 'angular2-wizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { SeoService } from '../app/seo.service'




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TutorialComponent } from './tutorial/tutorial.component';
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
import { ReviewByStudentComponent } from './review-by-student/review-by-student.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { UpdateTutorReferenceComponent } from './update-tutor-profile/update-tutor-reference/update-tutor-reference.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TncComponent } from './tnc/tnc.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FindTutorComponent } from './find-tutor/find-tutor.component'
import { TutorPublicComponent } from './tutor-public/tutor-public.component';
import { MenuComponent } from './menu/menu.component';
import { RedirectComponent } from './redirect/redirect.component';
import { HttpRequestInterceptor } from './services/HttpRequestInterceptor';
import { AppRoutingModule } from './app-routing.module';
import { CanonicalService } from './services/canonical.service';
import { FooterComponent } from './footer/footer.component';
import { GlobalService } from './services/global.service';

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
    ReviewByStudentComponent,
    OtpVerificationComponent,
    UpdateTutorReferenceComponent,
    ContactUsComponent,
    StudentEnquiryComponent,
    JobDetailsComponent,
    MainMenuComponent,
    FaqsComponent,
    AboutUsComponent,
    WhyUsComponent,
    PrivacyPolicyComponent,
    TncComponent,
    HowItWorksComponent,
    FindTutorComponent,
    TutorPublicComponent,
    MenuComponent,
    RedirectComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormWizardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    Title, SeoService, CanonicalService, GlobalService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'en-SG' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
