import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard } from '../app/service/authgard.service'
import { RatingPage } from '../app/rating/rating.page';
import { PaymentMethodPage } from './payment-method/payment-method.page';
import { PayRidePage } from './pay-ride/pay-ride.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'create-profile',
    loadChildren: () => import('./create-profile/create-profile.module').then( m => m.CreateProfilePageModule)
  },
  {
    path: 'select-payment-method',
    loadChildren: () => import('./select-payment-method/select-payment-method.module').then( m => m.SelectPaymentMethodPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'forgetotp',
    loadChildren: () => import('./forgetotp/forgetotp.module').then( m => m.ForgetotpPageModule)
  },
  {
    path: 'ride-history',
    loadChildren: () => import('./ride-history/ride-history.module').then( m => m.RideHistoryPageModule)
  },
  {
    path: 'trip-detail',
    loadChildren: () => import('./trip-detail/trip-detail.module').then( m => m.TripDetailPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'help-section',
    loadChildren: () => import('./help-section/help-section.module').then( m => m.HelpSectionPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'rating',
    component: RatingPage
  },
  {
    path: 'payment-method',
    component: PaymentMethodPage
  },
  {
    path: 'addcard',
    loadChildren: () => import('./addcard/addcard.module').then( m => m.AddcardPageModule)
  },
  {
    path: 'credit-debit-card',
    loadChildren: () => import('./credit-debit-card/credit-debit-card.module').then( m => m.CreditDebitCardPageModule)
  },
  {
    path: 'pay-ride',
    component: PayRidePage
  },
  {
    path: 'proceed-payment',
    loadChildren: () => import('./proceed-payment/proceed-payment.module').then( m => m.ProceedPaymentPageModule)
  },
  {
    path: 'add-insurance',
    loadChildren: () => import('./add-insurance/add-insurance.module').then( m => m.AddInsurancePageModule)
  },
];

  

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
