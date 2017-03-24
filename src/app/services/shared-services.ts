import { Injectable, OnInit } from '@angular/core'
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class SharedServices {

    modal: boolean = true;

    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
    }

    addToast(toastTitle: string, toastMessage: string, toastType: string) {
        var toastOptions: ToastOptions = {
            title: toastTitle,
            msg: toastMessage,
            showClose: false,
            timeout: 4000,
            theme: 'default',
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        if (toastType == 'success') {
            this.toastyService.success(toastOptions);
        }

        else if (toastType == 'error') {
            this.toastyService.error(toastOptions);
        }

        else if (toastType == 'warning') {
            this.toastyService.warning(toastOptions);
        }
    }

    // toggleImageModal() {
    //     this.modal = !this.modal;
    //     // return !this.modal;
    // }
}