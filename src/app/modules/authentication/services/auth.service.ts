import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

const bgImages = {
  login: '../../../assets/football.jpg',
  register: '../../../assets/basketball.jpg',
  validate: '../../../assets/tennis.jpg',
  forgotPassword: '../../../assets/nfl.jpg',
  changePassword: '../../../assets/volleyball.jpg'
};

@Injectable()
export class AuthService {

  public backgroundImage = new Subject<string>();
  public backgroundImageChanged = this.backgroundImage.asObservable();


  constructor() { }
  setBgImage(route) {
    this.backgroundImage.next(bgImages[route]);
  }
}
