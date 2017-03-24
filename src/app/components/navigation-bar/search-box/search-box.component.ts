import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Observable } from 'rxjs/Rx';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
    selector: 'search-box',
    templateUrl: 'search-box.template.html'
})

export class SearchBoxComponent{
    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig){
        this.toastyConfig.theme = 'bootstrap';
    };
    api = [
        {username: 'saad',
        password: '123',
        skills: [
            'erlang', 'haskell'
        ]
    },

    {username: 'taimoor',
        password: 'pagal',
        skills: [
            'c#', 'java'
        ]
    },

    {username: 'bilal',
        password: 'hello',
        skills: [
            'c++', 'vb'
        ]
    },

    {username: 'fahad',
        password: 'password',
        skills: [
            'php', 'sharepoint'
        ]
    }
    ]
    ngOnInit(){
        
    }
    // ngAfterViewInit(){
    //     let searchStream = '';
    //     const search$ = Observable.fromEvent(document.getElementById('searchx'), 'keyup')
    //         .map(val => val['target'].value );

    //     const api$ = Observable.from(this.api)
    //     .filter(value => value.username.indexOf(searchStream) != -1);


    //     search$.subscribe(response=>{
    //     api$.subscribe(response => console.log(response));
                
    //     })

    // }

        addToast() {
        // Just add default Toast with title only 
        // this.toastyService.default('Hi there');
        // Or create the instance of ToastOptions 
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot 
        // this.toastyService.info(toastOptions);
        this.toastyService.success(toastOptions);
        // this.toastyService.wait(toastOptions);
        // this.toastyService.error(toastOptions);
        // this.toastyService.warning(toastOptions);
    }
}
