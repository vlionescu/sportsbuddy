import { Component, OnInit } from '@angular/core';

// import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  bgImage: String;
  constructor() {

  }

  ngOnInit() {
    this.bgImage = '../../../assets/volleyball.jpg';
  }

}
