import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';

import { Config } from '../../../../assets/config';

import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

const bgImages = {
  login: '../../../assets/football.jpg',
  register: '../../../assets/basketball.jpg',
  validate: '../../../assets/tennis.jpg',
  forgotPassword: '../../../assets/nfl.jpg',
  changePassword: '../../../assets/volleyball.jpg'
};

@Injectable()
export class AuthService {
  config = Config;
  public backgroundImage = new Subject<string>();
  public backgroundImageChanged = this.backgroundImage.asObservable();


  constructor(
      private _http: HttpClient
  ) { }

  login():Observable<any> {
      return this._http.post(this.config.loginURL, {test: 'test'})
          .map((response) => response )
          .catch((error) => error)
  }

  setBgImage(route) {
    this.backgroundImage.next(bgImages[route]);
  }
}
