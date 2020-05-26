import {SET_LIST_TRANSACTION,SET_DETAIL_TRANSACTION} from '@/store/actions/TransactionAction'
const initialState = {
    list : [],
    detail : {}
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case SET_LIST_TRANSACTION:
            return {
                ...state,
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