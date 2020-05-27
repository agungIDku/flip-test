import {SET_LIST_TRANSACTION,SET_DETAIL_TRANSACTION} from '@/store/actions/TransactionAction'
const initialState = {
    loaded : 0,
    list : [],
    detail : {}
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_LIST_TRANSACTION:
            return {
                ...state,
                loaded : action.loaded,
                list : action.list
            }
        case SET_DETAIL_TRANSACTION:
            return {
                ...state,
                detail : action.detail
            }
        default:
            return state
    }
}