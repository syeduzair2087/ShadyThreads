import { Injectable, Inject } from '@angular/core'
import { FirebaseListObservable, FirebaseAuthState, AngularFire, FirebaseApp, AngularFireAuth } from 'angularfire2'
import { SharedServices } from './shared-services'
import { Router } from '@angular/router'

@Injectable()
export class AccountServices {
    firebase: any;
    imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/shady-threads.appspot.com/o/resources%2Fprofile.png?alt=media&token=c66c991f-8d4e-40a1-9749-0b6749ecaaec';
    email: string = '';
    displayName: string = '';

    constructor(private angularFire: AngularFire, @Inject(FirebaseApp) firebaseApp: any, private sharedServices: SharedServices, private router: Router) {
        this.firebase = firebaseApp;
        // this.loadUserData();
    }

    uploadImage(data) {
        let promise = new Promise((res, rej) => {
            // let fileName = name + ".jpg";
            let uploadTask = this.firebase.storage().ref('/profile_images/' + localStorage.getItem('currentUser')).putString(data, 'base64', { contentType: 'image/jpg' });
            uploadTask.on('state_changed', snapshot => {
            }, function (error) {
                rej(error);
            }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                res(downloadURL);
            });
        });
        return promise;
    }

    deleteImage(imageId: string) {
        this.firebase.storage().ref('/profile_images/' + imageId).delete();
    }


    updateImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    loadUserData() {
        // console.log('loading...');
        return this.angularFire.auth;

        // let af = this.angularFire.auth;
        // af.

        // setTimeout(() => {
        //     // console.log(this.displayName);
        //     af.unsubscribe();    
        // }, 5000);


        // this.angularFire.auth.subscribe((user: FirebaseAuthState) => {
        //     if (user) {
        //         if(user.auth.photoURL != null){
        //             this.imageUrl = user.auth.photoURL;
        //         }
        //         this.displayName = user.auth.displayName;
        //         this.email = user.auth.email;
        //     }
        // }).unsubscribe();
    }

    updateInfo(emailValue, displayNameValue, imageUrl) {
        let af = this.angularFire.auth;
        af.subscribe((user: FirebaseAuthState) => {
            if (user) {
                console.log('name: ' + displayNameValue);
                console.log('image: ' + this.imageUrl);
                user.auth.updateProfile({
                    displayName: displayNameValue,
                    photoURL: imageUrl,
                }).then(() => {
                    console.log('email: ' + emailValue);
                    user.auth.updateEmail(emailValue).then((success) => {
                        this.sharedServices.addToast('Account Updated', 'Your account information has been updated successfully.', 'success');
                    }).catch((error) => {
                        this.sharedServices.addToast('Update Failed', 'Your account information could not be updated.', 'error');
                    })
                })
            }
        }).unsubscribe();

        // setTimeout(() => {
        //     // console.log(this.displayName);
        //     af;    
        // }, 5000);
    }

    removeAccount() {
        this.angularFire.auth.subscribe((user: FirebaseAuthState) => {
            if (user) {
                var imageId = localStorage.getItem('currentUser');
                this.deleteImage(imageId);
                user.auth.delete().then((success) => {
                    localStorage.removeItem('currentUser');
                    this.sharedServices.addToast('Deleted Successfully', 'The account has been successfully deleted.', 'success');
                    setTimeout(() => {
                        this.router.navigate(['home']);
                    }, 1000)
                }).catch((error) => {
                    console.log('delete error: ' + error)
                    this.sharedServices.addToast('Delete Failed', 'Failed to delete account. Please login again and retry.', 'error');
                });
            }
        }).unsubscribe();
    }

    updatePassword(newPassword: string) {
        this.angularFire.auth.subscribe((user: FirebaseAuthState) => {
            if (user) {
                var imageId = localStorage.getItem('currentUser');
                // this.deleteImage();
                user.auth.updatePassword(newPassword).then((success) => {
                    // localStorage.removeItem('currentUser');
                    this.sharedServices.addToast('Password Updated Successfully', 'The password for your account has been updated successfully.', 'success');
                }).catch((error) => {
                    console.log('delete error: ' + error)
                    this.sharedServices.addToast('Password Update Failed', 'Failed to update password for your account. Please login again and retry.', 'error');
                });
            }
        }).unsubscribe();
    }

    resetPassword(emailAddress: string) {
        this.angularFire.auth.first().subscribe((user: FirebaseAuthState) => {
            if (user) {
                this.firebase.auth().sendPasswordResetEmail(emailAddress).then((success) => {
                    this.sharedServices.addToast('Mail Sent', 'A mail with the instructions to reset your password has been sent to your email account.', 'success')
                }).catch((error) => {
                    this.sharedServices.addToast('Mail Send Failed', 'A mail with the instructions to reset your password could not be sent to your email account.', 'error')
                });
            }
        }).unsubscribe();
    }
}