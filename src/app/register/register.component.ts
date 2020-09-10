import { User } from '../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert';
import { UserService, AuthenticationService } from '../services';
import { MustMatch } from '../helpers/matching-validate';
// import './register.component.scss';

@Component({ 
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss'] 
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        const { username, password } = this.authenticationService.currentUserValue || {};
        if (username && password) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            confirmUserName: ['', Validators.required],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        },
            {
                validator: [MustMatch('password', 'confirmPassword'), MustMatch('username', 'confirmUserName')]
            });
    }


    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        let { firstName, lastName, username, password } = this.registerForm.value;
        this.userService.register({ id: 0, firstName, lastName, username, password, token: '' })
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/welcome'], { queryParams: { fromRegister: true } });
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.registerForm.controls.User;
                    this.loading = false;
                });
    }
}
