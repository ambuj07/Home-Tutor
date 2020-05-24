import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialComponent } from './tutorial/tutorial.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { TutorRegistrationComponent } from './tutor-registration/tutor-registration.component';
import { NearbyStudendsComponent } from './nearby-studends/nearby-studends.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { FindMoreTutorsComponent } from './find-more-tutors/find-more-tutors.component';
import { StudentUpdateStatusComponent } from './student-update-status/student-update-status.component';
import { ReviewByStudentComponent } from './review-by-student/review-by-student.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { JobDetailsComponent } from './job-details/job-details.component';

import { FaqsComponent } from './faqs/faqs.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TncComponent } from './tnc/tnc.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FindTutorComponent } from './find-tutor/find-tutor.component'
import { TutorPublicComponent } from './tutor-public/tutor-public.component';
import { RedirectComponent } from './redirect/redirect.component';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NearbyTutorsComponent } from './nearby-tutors/nearby-tutors.component';
import { StudentMenuComponent } from './student-menu/student-menu.component';
import { TutorMenuComponent } from './tutor-menu/tutor-menu.component';
import { UpdateTutorProfileComponent } from './update-tutor-profile/update-tutor-profile.component';
import { UpdateClassAndSubjectComponent } from './update-tutor-profile/update-class-and-subject/update-class-and-subject.component';
import { UpdateEducationQualificationComponent } from './update-tutor-profile/update-education-qualification/update-education-qualification.component';
import { UpdateWorkLocationComponent } from './update-tutor-profile/update-work-location/update-work-location.component';
import { UpdateWorkExperienceComponent } from './update-tutor-profile/update-work-experience/update-work-experience.component';
import { UpdateTutorAddressComponent } from './update-tutor-profile/update-tutor-address/update-tutor-address.component';
import { UpdateTutorReferenceComponent } from './update-tutor-profile/update-tutor-reference/update-tutor-reference.component';
import { WhyUsComponent } from './why-us/why-us.component';

const routes: Routes = [
  {
    path: '',
    component: TutorialComponent,
    data: {
      title: 'Tutoring Services - Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes',
      description: 'Hansa Tutor is an online automated Platform to connect Educators (Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes) and Learners throughout the Country For – All Classes ; Courses ; Subjects ; NEET;  IIT JEE ; Science ; Arts ; Commerce ; Foreign Language ; Regional Language ; Competitive Exam ; Entrance Exams ; Dance ; Music ; YOGA',
      ogUrl: 'http://www.hansatutor.com/',
      ogImage: 'http://www.hansatutor.com/assets/fabicon.jpg'
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: TutorialComponent
  },
  {
    path: 'post',
    component: StudentRegistrationComponent,
    data: {
      title: 'Post Your Learning Needs, it’s Free - HansaTutor.Com/Post',
      description: 'Free Registration, Share your learning requirements and get Verified Professional Home Tutor, Online Trainer, Institutes, and Faculty Near you',
      ogUrl: 'http://www.hansatutor.com/post/',
      ogImage: 'http://www.hansatutor.com/assets/learnerIco.jpeg',
      keywords: 'Post Your Learning requirements, Student Registration, Book Teacher Trainers – Looking Home Tuition Tutors, Find Online Teacher Trainer, Search Group Classes, Find Coaching Centre Institutes, Book Personal Tutor, Hire Private Teacher, Search Tuition Bureau, Tutorials, Mentors, Coach, Instructors, Lecturer, School Teacher Near me, Class XI Mathematics , Class XII Maths , Std 11th Biology , Std 12th Physics , Grade XI Chemistry , Grade XII Computer Science , Class XI Accountancy , Class XII Accounts , Std 11th Economics , Std 12th Business Studies , Grade XI Mathematics , Grade XII Maths , AIIMS Biology , NEET Biotechnology , IIT JEE Physics , AIIMS Chemistry , NEET Biology , IIT JEE Maths , Class Nursery All Subjects , Class I All Subjects , Class II All Subjects , Class III All Subjects , Class IV All Subjects , Class V All Subjects , Class VI Chinese , Class VII Spanish , Class VIII Russian , Class IX Italia , Class X Japanese , Class XI English , Std 12th History , Grade XI Geography , Grade XII Home Science , Class XI Philosophy , Class XII Political Science , Std 11th Psychology , Std 12th Sociology , Grade XI Social Science , Grade XII All Subjects , Std 2nd Home Tutor , Std 3rd Home Tuition , Std 4th Home Tutors , Std 5th Tuition Teacher , Std 6th Personal Tutor , Std 7th Personal Tuition , Std 8th Private Teacher , Std 9th Online Trainer , Std 10th Online Teacher , Grade I Online Teacher , Grade II Online Tuition , Grade III Institutes , Grade IV Coaching Institutes , Grade V Coaching Classes , Grade VI Coaching Centre , Grade VII Group Classes , Grade VII Home Tutor , Grade IX Home Tuition , Grade X Home Tutors , Science Tuition Teacher , Arts Personal Tutor , Humanity Personal Tuition , Commerce Private Teacher , Foreign Languages Online Trainer , Regional Languages Online Teacher , Entrance Exams Online Teacher , Competitive Exams Online Tuition , Dance Institutes , Music Coaching Institutes , YOGA Coaching Classes , English Spoken Coaching Centre , Short Hand English Group Classes , Short Hand Hindi Home Tutor , Aptitude Test Home Tuition , Logical Reasoning Home Tutors , Drawing / Painting Tuition Teacher'
    }
  },
  {
    path: 'profile/student',
    component: ProfileComponent
  },
  {
    path: 'enquiry/:id',
    component: StudentEnquiryComponent
  },
  {
    path: 'postNewRequirement',
    component: FindMoreTutorsComponent
  },
  {
    path: 'edureg',
    component: TutorRegistrationComponent,
    data: {
      title: 'Join As Home Tutor, Online Trainer, Institutes, and Faculties',
      description: 'Free listing, Registration, Share your Details and get Verified leads, Teaching, Tutoring Jobs, Coaching Centers, Group Classes, Tuition Jobs, Students Near you',
      ogUrl: 'http://www.hansatutor.com/edureg/',
      ogImage: 'http://www.hansatutor.com/assets/educatorIcon.jpeg',
      keywords: 'Educator Jobs in Ahmadabad, Faculty Jobs in Bangalore, Home Tutor Jobs in Bhopal, Home Tutors Jobs in Chandigarh, Home Tuition Jobs in Chennai, Instructor Jobs in Coimbatore, Lecturer Jobs in Delhi NCR, Mentor Jobs in Faridabad, Online Advisor Jobs in Goa, Online Classes Jobs in Ghaziabad, Online Coaching Jobs in Gurgaon, Online Educator Jobs in Gurugram, Online Expert Jobs in Hyderabad, Online Institutes Jobs in Indore, Online Instructor Jobs in Jaipur, Online Lecturer Jobs in Kolkata, Online Mentor Jobs in Lucknow, Online Professor Jobs in Madurai, Online Teacher Jobs in Mumbai, Online Teaching Jobs in Mysore, Online Trainer Jobs in Nagpur, Online Training Jobs in Nashik , Online Tuition Jobs in Noida, Online Tuition Tutor Jobs in Pondicherry, Online Tutor Jobs in Pune, Online Tutorials Jobs in Rajkot, Online Tutors Jobs in Secunderabad, Personal Classes Jobs in Surat, Personal Home Tuition Jobs in Vadodara, Personal Home Tutor Jobs in Vijayawada, Personal Home Tutors Jobs in Visakhapatnam, Personal Instructor Jobs in Ahmedabad, Personal Mentor Jobs in Bangalore, Personal Teacher Jobs in Bhopal, Personal Trainer Jobs in Chandigarh, Personal Training Jobs in Chennai, Personal Tuition Jobs in Coimbatore, Personal Tuition Tutor Jobs in Delhi NCR, Personal Tutor Jobs in Faridabad, Personal Tutors Jobs in Goa, PGT Faculty Jobs in Ghaziabad , Private Home Tuition Jobs in Gurgaon, Private Home Tutor Jobs in Gurugram, Private Home Tutors Jobs in Hyderabad, Private Instructor Jobs in Indore, Private Mentor Jobs in Jaipur, Private Teacher Jobs in Kolkata, Private Trainer Jobs in Lucknow, Private Training Jobs in Madurai, Private Tuition Jobs in Mumbai, Private Tuition Tutor Jobs in Mysore, Private Tutor Jobs in Nagpur, Professor Jobs in Nashik, School Teacher Jobs in Noida, Specialist Jobs in Pondicherry, Teacher Jobs in Pune, Teaching Jobs in Rajkot, TGT Faculty Jobs in Secunderabad, Trainer Jobs in Surat, Training Jobs in Vadodara, Tuition Jobs in Vijayawada, Tuition Centre Jobs in Visakhapatnam, Tuition Tutor Jobs in Bangalore, Tutor Jobs in Chandigarh, Tutorials Jobs in Chennai, Tutoring Jobs in Kolkata, Tutors Jobs in Mumbai'
    }
  },
  {
    path: 'nearbyStudents',
    component: NearbyStudendsComponent
  },
  {
    path: 'profile/tutor',
    component: TutorProfileComponent
  },
  {
    path: 'tutor/:id',
    component: TutorPublicComponent
  },
  {
    path: 'dashboard/tutor',
    component: DashboardComponent
  },
  {
    path: 'dashboard/student',
    component: StudentDashboardComponent
  },
  {
    path: 'enq/:id',
    component: JobDetailsComponent
  },
  {
    path: 'editProfile/tutor',
    component: UpdateTutorProfileComponent
  },
  {
    path: 'tutor/edit/classAndSubject',
    component: UpdateClassAndSubjectComponent
  },
  {
    path: 'tutor/edit/education',
    component: UpdateEducationQualificationComponent
  },
  {
    path: 'tutor/edit/workLocation',
    component: UpdateWorkLocationComponent
  },
  {
    path: 'tutor/edit/experience',
    component: UpdateWorkExperienceComponent
  },
  {
    path: 'tutor/edit/address',
    component: UpdateTutorAddressComponent
  },
  {
    path: 'tutor/edit/guarantor',
    component: UpdateTutorReferenceComponent
  },
  {
    path: 'student/updateStatus',
    component: StudentUpdateStatusComponent
  },
  {
    path: 'student/review',
    component: ReviewByStudentComponent
  },
  {
    path: 'contactus',
    component: ContactUsComponent
  },
  {
    path: 'askQuestion',
    component: ContactUsComponent
  },
  {
    path: 'feedback',
    component: ContactUsComponent
  },
  {
    path: 'otp',
    component: OtpVerificationComponent
  },
  {
    path: 'faq/:type',
    component: FaqsComponent
  },
  {
    path: 'tnc/:type',
    component: TncComponent
  },
  {
    path: 'how-it-works/:type',
    component: HowItWorksComponent
  },
  {
    path: 'why-us',
    component: WhyUsComponent,
    data: {
      title: 'Why Us',
      description: 'Hansa Tutor is an online automated Platform to connect Educators (Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes) and Learners throughout the Country For – All Classes ; Courses ; Subjects ; NEET;  IIT JEE ; Science ; Arts ; Commerce ; Foreign Language ; Regional Language ; Competitive Exam ; Entrance Exams ; Dance ; Music ; YOGA',
      ogUrl: 'http://www.hansatutor.com/why-us/',
      ogImage: 'http://www.hansatutor.com/assets/fabicon.jpg'
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: 'About Us',
      description: 'Hansa Tutor is an online automated Platform to connect Educators (Personal Home Tuition Tutor Online Teacher Trainer Group Classes Coaching Centre Institutes) and Learners throughout the Country For – All Classes ; Courses ; Subjects ; NEET;  IIT JEE ; Science ; Arts ; Commerce ; Foreign Language ; Regional Language ; Competitive Exam ; Entrance Exams ; Dance ; Music ; YOGA',
      ogUrl: 'http://www.hansatutor.com/about-us/',
      ogImage: 'http://www.hansatutor.com/assets/fabicon.jpg'
    }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'search',
    children: [
      { path: '', component: FindTutorComponent},
      { path: ':city', component: FindTutorComponent},
      { path: ':city/:tutorType', component: FindTutorComponent},
      { path: ':city/:tutorType/:class', component: FindTutorComponent},
      { path: ':city/:tutorType/:class/:subject', component: FindTutorComponent},
    ]
  },
  {
    path: 'stu/search/:tutorType',
    component: FindJobsComponent
  },
  {
    path: 'admin',
    component: RedirectComponent
  }
  //   {
  //     path: '**',
  //     redirectTo : ''
  //  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }