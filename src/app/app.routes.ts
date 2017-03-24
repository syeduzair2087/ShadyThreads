import { Routes, Route, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component'
import { DetailsPanelComponent } from './components/products/category-collapse/details-panel/details-panel.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { AccountSettingsComponent } from './components/account-settings/account-settings.component'

const baseRoute: Route = {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
};

const fallbackRoute: Route = {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
};

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },

    {
        path: 'products',
        component: ProductsComponent,
        children: [
            {
                outlet: 'details-outlet',
                path:'',
                component: DetailsPanelComponent
            }
        ]
    },

    {
        path: 'signup',
        component: SignUpComponent
    },

    {
        path: 'account',
        component: AccountSettingsComponent
    },

    baseRoute,
    fallbackRoute
];

export const RoutingModule = RouterModule.forRoot(routes, {useHash: true});
