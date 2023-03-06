import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '@saanbo/common/core/interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from '@saanbo/common/core/interceptors/refresh-token.interceptor';
import { AppConfig } from '@saanbo/common/core/services/app.config';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebAppConfig } from './features/shared/web-app.config';

const httpInterceptorProviders = [
  // The refresh interceptor should be before the auth interceptor, otherwise refreshed bearer would not be updated
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshTokenInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

/** Root module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
  ],
  providers: [
    ...httpInterceptorProviders,
    { provide: AppConfig, useClass: WebAppConfig },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          link: httpLink.create({
            uri: environment.apiUrl,
          }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
