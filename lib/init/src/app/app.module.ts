import {
    BrowserModule
} from '@angular/platform-browser';
import {
    FormsModule
} from '@angular/forms';
import {
    HttpModule
} from '@angular/http';
import {
    NgModule,
    ApplicationRef
} from '@angular/core';
import {
    removeNgStyles,
    createNewHosts,
    createInputTransfer
} from '@angularclass/hmr';
import {
    RouterModule,
    PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import{
    APP_NGRX_IMPORT,
    APP_NGRX_PROVIDERS
} from './app.ngrx';
import {
    ENV_PROVIDERS
} from './environment';
import {
    ROUTES
} from './app.routes';
// App is our top level component
import {
    IndexComponent
} from './pages/index';
import {
    NoContentComponent
} from './pages/no-content';
import {
    AppService,
    InternalStateType
} from './app.service';

interface StoreType {
    restoreInputValues: () => void;
    disposeOldHosts: () => void;
}
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [IndexComponent],
    declarations: [
        IndexComponent,
        NoContentComponent
    ],
    /**
     * Import Angular's modules.
     */
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        }),
        APP_NGRX_IMPORT
    ],
    /**
     * Expose our Services and Providers into Angular's dependency injection.
     */
    providers: [
        ENV_PROVIDERS,
        AppService,
        APP_NGRX_PROVIDERS
    ]
})
export class AppModule {

    constructor(
        public appRef: ApplicationRef,
        public appState: AppService
    ) {}

    public hmrOnInit(store: StoreType) {
        // if (!store || !store.state) {
        // 	return;
        // }
        // console.log('HMR store', JSON.stringify(store, null, 2));
        // /**
        //  * Set state
        //  */
        // this.appState._state = store.state;
        // /**
        //  * Set input values
        //  */
        // if ('restoreInputValues' in store) {
        //     const restoreInputValues = store.restoreInputValues;
        //     setTimeout(restoreInputValues);
        // }

        // this.appRef.tick();
        // delete store.state;
        // delete store.restoreInputValues;
    }

    public hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
        /**
         * Recreate root elements
         */
        store.disposeOldHosts = createNewHosts(cmpLocation);
        /**
         * Save input values
         */
        // store.restoreInputValues = createInputTransfer();
        /**
         * Remove styles
         */
        removeNgStyles();
    }

    public hmrAfterDestroy(store: StoreType) {
        /**
         * Display new elements
         */
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}