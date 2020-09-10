﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert';
import { AuthenticationService } from '../services';
// import './login.component.scss';

@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'] 
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    invalidPassword = false;
    returnUrl: string;
    userName: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        debugger;
        const { username, password } = this.authenticationService.currentUserValue;
        this.userName = username;
        if (username && !password) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.userName, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Signed in successfully');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.invalidPassword = true;
                    this.loading = false;
                });
    }
}
