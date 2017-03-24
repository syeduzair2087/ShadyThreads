import { Injectable } from '@angular/core'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2'
import { Router } from '@angular/router';
import { SharedServices } from './shared-services'
import { CartServices } from './cart-services'

@Injectable()
export class LoginServices {

    constructor(private angularFire: AngularFire, private sharedServices: SharedServices, private router: Router, private cartServices: CartServices) { }

    loginUser(email: string, password: string) {
        this.angularFire.auth.login({ email: email, password: password }).then(
            (success) => {
                console.log('login successful!');
                setTimeout(() => {
                    this.angularFire.auth.subscribe((user: FirebaseAuthState) => {
                        if (user) {
                            localStorage.setItem('currentUser', user.uid);
                            this.cartServices.rebindCart(user.uid);
                            this.sharedServices.addToast('Login Successful', 'You have been successfully logged in.', 'success');
                        }
                    }).unsubscribe();
                }, 500);
            }).catch(
            (err) => {
                console.log('error: ' + err);
                this.sharedServices.addToast('Login Failed', 'Please check your credentials and try again.', 'error');
            })
    }

    logoutUser() {
        this.angularFire.auth.logout();
        localStorage.removeItem('currentUser');
        setTimeout(() => {
            this.router.navigate(['home']);
        }, 1000)
        // this.sharedServices.isLoggedIn = false;
        // this.loggedIn = this.sharedServices.isLoggedIn;
    }

    getLoginState() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        else {
            return false;
        }
    }

    registerUser(email: string, password: string) {
        this.angularFire.auth.createUser({ email: email, password: password }).then(
            (success) => {
                console.log('Registered successfully!');
                this.sharedServices.addToast('Registration successful', 'Please use the credentials to login', 'success');
                setTimeout(() => {
                    this.router.navigate(['home']);
                }, 1000)
            }).catch(
            (err) => {
                console.log('login-service-error: ' + err),
                    this.sharedServices.addToast('Failed To Signup', 'Please check the data and try again', 'error');
            }
            )
    }
}