import { EventEmitter, Component, ViewChild, Type, Inject, Output, Input, ElementRef } from '@angular/core';
// import { FirebaseListObservable, FirebaseAuthState, AngularFire, FirebaseApp } from 'angularfire2'
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { AccountServices } from '../../../services/account-services';
import { SharedServices } from '../../../services/shared-services';


@Component({
    selector: 'image-crop-modal',
    templateUrl: 'image-crop.template.html'
})

export class ImageCropModalComponent {
    data1: any;
    cropperSettings1: CropperSettings;
    firebase: any;

    @Input() userEmail: string;
    @Input() userName: string;
    @Input() accountServices: AccountServices;

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    @Output() fileUploadEventEmitter = new EventEmitter();

    cropped(bounds: Bounds) {
        //console.log(bounds);
    }

    constructor(private sharedServices: SharedServices, private elementRef: ElementRef) {

        this.cropperSettings1 = new CropperSettings();
        this.cropperSettings1.width = 50;
        this.cropperSettings1.height = 50;

        this.cropperSettings1.croppedWidth = 300;
        this.cropperSettings1.croppedHeight = 300;

        // this.cropperSettings1.canvasWidth = 600;
        // this.cropperSettings1.canvasHeight = 600;

        this.cropperSettings1.minWidth = 50;
        this.cropperSettings1.minHeight = 50;

        this.cropperSettings1.rounded = false;
        this.cropperSettings1.responsive = true;

        this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

        this.data1 = {};
    }

    fileUploaded: boolean = false;

    fileUploadEvent(event) {
        var image: any = new Image();
        var file: File = event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(file);
    }

    ngOnInit() {
        let canvas: HTMLCanvasElement = document.getElementById('cropper-elem').querySelector('canvas');
        canvas.style.display = 'none';
    }

    btnClickSave() {
        // let croppedImage: File = this.data1.image;
        this.accountServices.uploadImage((<string>(this.data1.image)).substring(23)).then((data) => {
            this.accountServices.updateInfo(this.userEmail, this.userName, data);
            this.accountServices.updateImageUrl(<string>data);
            this.fileUploadEventEmitter.emit(data);
            this.sharedServices.addToast('Upload Successful', 'Your display image has been successfully updated.', 'success');
        }).catch((error) => {
            console.log(error);
            this.sharedServices.addToast('Upload Failed', 'The image could not be uploaded successfuly. Please try again later.', 'error');
        })
    }


}