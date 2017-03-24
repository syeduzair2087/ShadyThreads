import { Component, Inject, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core'
import { SharedServices } from '../../services/shared-services'
import { FirebaseListObservable, FirebaseAuthState, AngularFire, FirebaseApp } from 'angularfire2'
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { AccountServices } from '../../services/account-services'

@Component({
    selector: 'account-settings',
    templateUrl: 'account-settings.template.html'
})

export class AccountSettingsComponent {
    fileInput: any;
    txtDisplayName: string;
    firebase: any;

    authObject: any;

    cropEmail = '';
    cropName = '';

    imageUrl: string = '';
    email: string = '';
    displayName: string = '';
    password: string = '';

    constructor(private sharedServices: SharedServices, private angularFire: AngularFire, @Inject(FirebaseApp) firebaseApp: any, private accountServices: AccountServices) {
        this.firebase = firebaseApp;
    }

    logFile() {
        console.log(this.fileInput);
    }

    fileChange(event) {
        let filelist: FileList = event.target.files;
        if (filelist.length > 0) {
            let file: File = filelist[0];

            // this.fileUploadEventEmitter.emit();

            //  this.uploadImage(file.name, file).then((data) => {
            //      console.log(data);
            //      document.getElementById('profile_image').setAttribute('src', <string>data);
            //  }).catch((error) => {
            //      console.log('file upload error')
            //  })
        }
        console.log('change event');
    }

    uploadImage(name, data) {
        let promise = new Promise((res, rej) => {
            let fileName = name + ".jpg";
            let uploadTask = this.firebase.storage().ref('/profile_images/' + localStorage.getItem('currentUser')).put(data);
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



    btnClickUpdateInfo() {
        console.log('update started');
        this.accountServices.updateInfo(this.email, this.displayName, this.imageUrl);
        this.cropName = this.displayName;
        this.cropEmail = this.email;
        console.log(this.imageUrl);
        console.log('update ended');
    }

    ngOnInit() {
        this.authObject = this.accountServices.loadUserData().subscribe((user: FirebaseAuthState) => {
            if (user) {
                if (user.auth.photoURL != null) {
                    this.imageUrl = user.auth.photoURL;
                    console.log('image: ' + this.imageUrl);
                }

                else {
                    this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/shady-threads.appspot.com/o/resources%2Fprofile.png?alt=media&token=c66c991f-8d4e-40a1-9749-0b6749ecaaec';
                }
                this.cropName = this.displayName = user.auth.displayName;
                this.cropEmail = this.email = user.auth.email;
                console.log('data loaded!');
            }
        });
    }

    ngOnDestroy() {
        this.authObject.unsubscribe();
    }

    imageUploadEvent(imageUrl) {
        // this.accountServices.updateImageUrl(imageUrl)
        this.imageUrl = imageUrl;
        console.log('event working! :)');
    }

    btnClickRemoveAccount() {
        this.accountServices.removeAccount();
    }
}