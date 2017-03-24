import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { NavigationBarComponent } from './components/navigation-bar/nav-bar.component';
import { SearchBoxComponent } from './components/navigation-bar/search-box/search-box.component';
import { LoginFormComponent } from './components/navigation-bar/login-form/login-form.component';

import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './components/home/home.component';
import { HomeCarouselComponent } from './components/home/carousel/carousel.component';
import { WelcomeJumbotronComponent } from './components/home/jumbotron/jumbotron.component';
import { ProductsAlbumComponent } from './components/home/album/album.component';

import { ProductsModule } from './components/products/products.module';

import { SignUpComponent } from './components/sign-up/sign-up.component'

import { AccountSettingsComponent } from './components/account-settings/account-settings.component'
import { ImageCropModalComponent } from './components/account-settings/image-crop/image-crop.component'
import { DeleteAccountModalComponent } from './components/account-settings/delete-account/delete-account.component'
import { UpdatePasswordModalComponent } from './components/account-settings/update-password/update-password.component'

import { CartModalComponent } from './components/cart-modal/cart-modal.component'

import { RoutingModule } from './app.routes';
import { SharedServices } from './services/shared-services';
import { LoginServices } from './services/login-services';
import { CartServices } from './services/cart-services';
import { ProductServices } from './services/product-services';
import { AccountServices } from './services/account-services';

import { ToastyModule } from 'ng2-toasty'
import { ImageCropperModule } from 'ng2-img-cropper'
import { AngularFireModule, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2'; //yeahhh:D


// import { SlimScroll } from 'angular-io-slimscroll'

export const firebaseConfig = {
  apiKey: "AIzaSyDF4duDkn_s4erjcCKcQWkK4YKokPMf0T0",
  authDomain: "shady-threads.firebaseapp.com",
  databaseURL: "https://shady-threads.firebaseio.com",
  storageBucket: "shady-threads.appspot.com",
  messagingSenderId: "744250490012"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HomeCarouselComponent,
    WelcomeJumbotronComponent,
    ProductsAlbumComponent,
    NavigationBarComponent,
    SearchBoxComponent,
    LoginFormComponent,
    SignUpComponent,
    AccountSettingsComponent,
    ImageCropModalComponent,
    DeleteAccountModalComponent,
    UpdatePasswordModalComponent,
    CartModalComponent
  ],
  imports: [
    ProductsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    ToastyModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ImageCropperModule
  ],
  providers: [
    SharedServices,
    LoginServices,
    CartServices,
    ProductServices,
    AccountServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
