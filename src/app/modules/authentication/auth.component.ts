import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  bgImage: String;
  constructor(private _authService: AuthService) {
    this._authService.backgroundImageChanged.subscribe((imageURL) => this.bgImage = imageURL)
  }

  ngOnInit() {
    this.bgImage = '../../../assets/football.jpg';
  }

}
