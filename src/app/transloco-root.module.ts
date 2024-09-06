import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { NgModule, isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
// import { environment } from '../environments/environment';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'sw'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
