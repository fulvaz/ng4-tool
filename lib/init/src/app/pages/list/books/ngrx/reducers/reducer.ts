import * as Model from '../actions';

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

export function ListBooksReducer(
    state = initState,
    action: Model.ListStartAction | Model.ListSuccessAction | Model.ListErrorAction
): State {
    switch (action.type) {
        case Model.BOOKS_START:
            {
                return Object.assign(state, action.payload);
            }
        case Model.BOOKS_SUCCESS:
            {
                return Object.assign(state, action.payload);
            }
        case Model.BOOKS_ERROR:
            {
                return Object.assign(state, action.payload);
            }
        default:
            {
                return state;
            }
    }
}