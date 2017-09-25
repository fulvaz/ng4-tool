import {
    Action
} from '@ngrx/store';

import {
    TemplateModel
} from '../models';
export const Template_ACTION = '[Template] TYPE';

export class TemplateAction implements Action {
    public readonly type = Template_ACTION;
    constructor(public payload: TemplateModel) {
        /*  */
    }
}
