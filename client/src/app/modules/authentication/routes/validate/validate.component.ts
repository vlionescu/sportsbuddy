import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  constructor(private _authService: AuthService) {

  }
  ngOnInit() {
    this._authService.setBgImage('validate');
  }

}
