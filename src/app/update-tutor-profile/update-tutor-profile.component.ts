import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-update-tutor-profile',
  templateUrl: './update-tutor-profile.component.html',
  styleUrls: ['./update-tutor-profile.component.css']
})
export class UpdateTutorProfileComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      
  }

}
