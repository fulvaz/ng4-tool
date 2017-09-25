import {
    Injectable
} from '@angular/core';
import {
    Effect,
    Actions,
    toPayload
} from '@ngrx/effects';
import {
    Action
} from '@ngrx/store';
import {
    Observable
} from 'rxjs/Observable';

import {
    TemplateService
} from './../services';
import {
    Template_ACTION,
    TemplateAction
} from '../actions';

@Injectable()
export class TemplateEffect {
    @Effect()
    public Template$: Observable < Action > = this.actions$
        .ofType(Template_ACTION)
        .map(toPayload)
        .switchMap((config) => {
            return this.TemplateService.get(config)
                .map((data: any) => {
                    return data;
                    // return {
                    //     type: ActionType,
                    //     payload: data
                    // };
                });
        });
    constructor(private actions$: Actions, private TemplateService: TemplateService) {}
}