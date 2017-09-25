import {
    Template_ACTION,
    TemplateAction
} from '../actions';

export interface State {
    id: number | string;
    name: string;
    list: any[];
    code: number;
};

export const initState: State = {
    id: 'default',
    name: '默认书列表',
    list: [],
    code: -1
};

export function TemplateReducer(
    state = initState,
    action: TemplateAction
): State {
    switch (action.type) {
        case Template_ACTION:
            {
                return Object.assign(state, action.payload);
            }
        default:
            {
                return state;
            }
    }
}