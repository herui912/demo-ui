import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from '../../constants';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('authenticationModal') authenticationModal: ModalDirective;
  username: string = ''; 
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthenticationService, private router: Router) {1}
  ngAfterViewInit(): void {
    this.authenticationModal.show();
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/users'])
    }
  }

  showModal() {
    if (!localStorage.getItem('user')) {
      this.authenticationModal.show();
    }
  }

  login() {
    if (!isNaN(Number(this.username))) {
      this.errorMessage = 'Username / Password is not valid.';
      return;
    }
    this.auth.authenticate(this.username, this.password).subscribe(data => {
      if (!localStorage.getItem('user')) {
        this.errorMessage = 'Username / Password is not valid.';
      } else {
        this.router.navigate(['/users']);
      }
    },
      error => {
        this.errorMessage = Constants.INTERNAL_SERVER_ERROR;
      }
    )
  }

  clearFormData (): void {
    this.errorMessage = '';
    this.password = '';
  }

}
