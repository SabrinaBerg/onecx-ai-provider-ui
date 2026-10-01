import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader } from '@ngx-translate/core'

import { AngularAuthModule } from '@onecx/angular-auth'
import { AngularAcceleratorModule } from '@onecx/angular-accelerator'
import { APIConfiguration } from 'src/app/shared/generated'
import { provideTranslateServiceForRoot } from '@onecx/angular-remote-components'
import { createTranslateLoader, provideThemeConfig, provideTranslationPathFromMeta } from '@onecx/angular-utils'
import { bootstrapRemoteComponent } from '@onecx/angular-webcomponents'
import { AppStateService, ConfigurationService } from '@onecx/angular-integration-interface'

import { environment } from 'src/environments/environment'
import { apiConfigProvider } from 'src/app/shared/utils/apiConfigProvider.utils'
import { OneCXAiConnectorComponent } from './onecx-ai-connector.component'

const apiConfigurationProvider = {
  provide: APIConfiguration,
  useFactory: apiConfigProvider,
  deps: [ConfigurationService, AppStateService]
}

bootstrapRemoteComponent(OneCXAiConnectorComponent, 'ocx-onecx-ai-connector-component', environment.production, [
  provideHttpClient(withInterceptorsFromDi()),
  importProvidersFrom(AngularAcceleratorModule, AngularAuthModule, BrowserAnimationsModule),
  apiConfigurationProvider,
  provideTranslationPathFromMeta(import.meta.url, 'assets/i18n/'),
  provideTranslateServiceForRoot({
    isolate: true,
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]
    }
  }),
  provideThemeConfig()
])
